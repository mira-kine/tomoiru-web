# Tomoiru Backend Authentication Implementation Guide

## Overview
This guide will help you implement Google OAuth + Email/Password authentication with JWT tokens in your FastAPI backend.

## Architecture Flow

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Frontend  │─────▶│   Backend    │─────▶│  PostgreSQL │
│  (Next.js)  │◀─────│   (FastAPI)  │◀─────│  (pgvector) │
└─────────────┘      └──────────────┘      └─────────────┘
      │                     │
      │              ┌──────▼──────┐
      └─────────────▶│   Google    │
                     │   OAuth     │
                     └─────────────┘

Authentication Flow:
1. User clicks "Sign in with Google" → Frontend redirects to /api/v1/auth/login/google
2. Backend redirects to Google OAuth
3. User approves → Google redirects to /api/v1/auth/callback/google
4. Backend exchanges code for user info, creates/updates user in DB
5. Backend generates JWT token
6. Backend redirects to frontend with JWT token
7. Frontend stores JWT and uses it for all subsequent API calls
```

## Part 1: Dependencies Installation

Navigate to your backend directory and install required packages:

```bash
cd /path/to/tomoiru-backend
source venv/bin/activate

pip install \
    authlib \
    python-jose[cryptography] \
    passlib[bcrypt] \
    python-multipart \
    itsdangerous

# Update requirements.txt
pip freeze > requirements.txt
```

## Part 2: Environment Variables

Add to your `.env` file:

```bash
# JWT Settings
JWT_SECRET_KEY="your-super-secret-key-here-min-32-chars"  # Generate with: openssl rand -hex 32
JWT_ALGORITHM="HS256"
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=10080  # 7 days

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_REDIRECT_URI="http://localhost:8000/api/v1/auth/callback/google"

# Frontend URL
FRONTEND_URL="http://localhost:3000"

# Existing settings...
DATABASE_URL="postgresql://..."
OPENAI_API_KEY="..."
```

### How to Get Google OAuth Credentials:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Google+ API" or "Google Identity Services"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Application type: "Web application"
6. Authorized redirect URIs: `http://localhost:8000/api/v1/auth/callback/google`
7. Save and copy Client ID and Client Secret

## Part 3: Database Schema

Create `app/models/user.py`:

```python
from sqlalchemy import Column, String, DateTime, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid
import enum

from app.database import Base

class AuthProvider(str, enum.Enum):
    """Authentication provider types"""
    GOOGLE = "google"
    EMAIL = "email"

class User(Base):
    """User model for authentication and profile"""
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    user_name = Column(String, nullable=True)  # Set during welcome flow

    # OAuth fields
    auth_provider = Column(SQLEnum(AuthProvider), nullable=False)
    oauth_id = Column(String, nullable=True)  # Google user ID

    # Email/Password fields
    hashed_password = Column(String, nullable=True)  # Only for email auth

    # Metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<User {self.email}>"
```

Create migration file `alembic/versions/001_create_users_table.py`:

```python
"""create users table

Revision ID: 001
Revises:
Create Date: 2025-01-19
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID
import uuid

# revision identifiers
revision = '001'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    op.create_table(
        'users',
        sa.Column('id', UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
        sa.Column('email', sa.String(), nullable=False),
        sa.Column('user_name', sa.String(), nullable=True),
        sa.Column('auth_provider', sa.Enum('google', 'email', name='authprovider'), nullable=False),
        sa.Column('oauth_id', sa.String(), nullable=True),
        sa.Column('hashed_password', sa.String(), nullable=True),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()')),
        sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()')),
    )
    op.create_index('ix_users_id', 'users', ['id'])
    op.create_index('ix_users_email', 'users', ['email'], unique=True)

def downgrade():
    op.drop_index('ix_users_email', table_name='users')
    op.drop_index('ix_users_id', table_name='users')
    op.drop_table('users')
    op.execute('DROP TYPE authprovider')
```

Run migration:
```bash
alembic upgrade head
```

## Part 4: JWT Utility Functions

Create `app/core/security.py`:

```python
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
import os
from dotenv import load_dotenv

from app.database import get_db
from app.models.user import User

load_dotenv()

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT settings
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
JWT_ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("JWT_ACCESS_TOKEN_EXPIRE_MINUTES", "10080"))

# HTTP Bearer token security
security = HTTPBearer()

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Generate JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=JWT_ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    return encoded_jwt

def verify_token(token: str) -> dict:
    """Verify and decode JWT token"""
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

def hash_password(password: str) -> str:
    """Hash a password for storing"""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against a hash"""
    return pwd_context.verify(plain_password, hashed_password)

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    """Dependency to get current authenticated user from JWT token"""
    token = credentials.credentials
    payload = verify_token(token)
    user_id: str = payload.get("sub")

    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials"
        )

    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )

    return user
```

## Part 5: Pydantic Schemas

Create `app/schemas/auth.py`:

```python
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from uuid import UUID

class UserBase(BaseModel):
    email: EmailStr
    user_name: Optional[str] = None

class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)

class UserResponse(BaseModel):
    id: UUID
    email: str
    user_name: Optional[str]
    auth_provider: str
    created_at: datetime

    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    user_name: Optional[str] = None

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

class EmailPasswordLogin(BaseModel):
    email: EmailStr
    password: str
```

---

## Part 6: Authentication Endpoints (CONTINUED IN NEXT MESSAGE)

This guide continues with:
- OAuth routes implementation
- Email/Password routes
- User management endpoints
- CORS and middleware setup

Would you like me to continue with the rest of the implementation?
