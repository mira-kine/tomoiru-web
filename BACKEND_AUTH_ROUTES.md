# Tomoiru Backend Authentication - Routes Implementation

## Part 6: Google OAuth Routes

Create `app/routes/auth.py`:

```python
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from authlib.integrations.starlette_client import OAuth
from starlette.config import Config
from starlette.requests import Request
import os
from dotenv import load_dotenv

from app.database import get_db
from app.models.user import User, AuthProvider
from app.schemas.auth import TokenResponse, UserResponse, EmailPasswordLogin, UserCreate
from app.core.security import (
    create_access_token,
    get_current_user,
    hash_password,
    verify_password
)

load_dotenv()

router = APIRouter(prefix="/api/v1/auth", tags=["Authentication"])

# Configure OAuth
config = Config(environ=os.environ)
oauth = OAuth(config)

oauth.register(
    name='google',
    client_id=os.getenv('GOOGLE_CLIENT_ID'),
    client_secret=os.getenv('GOOGLE_CLIENT_SECRET'),
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={
        'scope': 'openid email profile'
    }
)

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

# ============= GOOGLE OAUTH ROUTES =============

@router.get("/login/google")
async def login_google(request: Request):
    """Initiate Google OAuth flow"""
    redirect_uri = os.getenv("GOOGLE_REDIRECT_URI")
    return await oauth.google.authorize_redirect(request, redirect_uri)

@router.get("/callback/google")
async def callback_google(request: Request, db: Session = Depends(get_db)):
    """Handle Google OAuth callback"""
    try:
        # Exchange authorization code for access token
        token = await oauth.google.authorize_access_token(request)
        user_info = token.get('userinfo')

        if not user_info:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to get user info from Google"
            )

        email = user_info.get('email')
        google_id = user_info.get('sub')
        name = user_info.get('name')

        # Check if user exists
        user = db.query(User).filter(User.email == email).first()

        if not user:
            # Create new user
            user = User(
                email=email,
                auth_provider=AuthProvider.GOOGLE,
                oauth_id=google_id,
                user_name=name  # Pre-fill from Google, can be changed in welcome flow
            )
            db.add(user)
            db.commit()
            db.refresh(user)

        # Generate JWT token
        access_token = create_access_token(data={"sub": str(user.id)})

        # Redirect to frontend with token
        redirect_url = f"{FRONTEND_URL}/auth/callback?token={access_token}&new_user={user.user_name is None}"
        return RedirectResponse(url=redirect_url)

    except Exception as e:
        print(f"OAuth error: {str(e)}")
        return RedirectResponse(url=f"{FRONTEND_URL}/login?error=oauth_failed")

# ============= EMAIL/PASSWORD ROUTES =============

@router.post("/signup", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def signup_email(user_data: UserCreate, db: Session = Depends(get_db)):
    """Sign up with email and password"""
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Create new user
    hashed_pw = hash_password(user_data.password)
    new_user = User(
        email=user_data.email,
        hashed_password=hashed_pw,
        auth_provider=AuthProvider.EMAIL
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Generate JWT token
    access_token = create_access_token(data={"sub": str(new_user.id)})

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse.from_orm(new_user)
    )

@router.post("/login", response_model=TokenResponse)
def login_email(login_data: EmailPasswordLogin, db: Session = Depends(get_db)):
    """Login with email and password"""
    # Find user
    user = db.query(User).filter(User.email == login_data.email).first()

    if not user or user.auth_provider != AuthProvider.EMAIL:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # Verify password
    if not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # Generate JWT token
    access_token = create_access_token(data={"sub": str(user.id)})

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse.from_orm(new_user)
    )

# ============= TOKEN REFRESH =============

@router.post("/refresh", response_model=TokenResponse)
def refresh_token(current_user: User = Depends(get_current_user)):
    """Refresh JWT token (extends expiration)"""
    access_token = create_access_token(data={"sub": str(current_user.id)})

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse.from_orm(current_user)
    )
```

## Part 7: User Management Routes

Create `app/routes/users.py`:

```python
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.auth import UserResponse, UserUpdate
from app.core.security import get_current_user

router = APIRouter(prefix="/api/v1/users", tags=["Users"])

@router.get("/me", response_model=UserResponse)
def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Get current authenticated user's profile"""
    return UserResponse.from_orm(current_user)

@router.patch("/me", response_model=UserResponse)
def update_current_user(
    user_update: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update current user's profile (e.g., username during welcome flow)"""
    if user_update.user_name is not None:
        current_user.user_name = user_update.user_name

    db.commit()
    db.refresh(current_user)
    return UserResponse.from_orm(current_user)
```

## Part 8: Update Chat Endpoint to Require Authentication

Update `app/routes/chat.py`:

```python
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.chat import ChatRequest, ChatResponse
from app.core.security import get_current_user
from app.services.rag_service import generate_chat_response

router = APIRouter(prefix="/api/v1", tags=["Chat"])

@router.post("/chat/", response_model=ChatResponse)
def chat_endpoint(
    request: ChatRequest,
    current_user: User = Depends(get_current_user),  # <- Add authentication
    db: Session = Depends(get_db)
):
    """
    Chat with Tomomi using RAG.
    Now requires authentication - users must be logged in.
    """
    try:
        response = generate_chat_response(
            user_message=request.message,
            conversation_history=request.conversation_history,
            num_context_docs=request.num_context_docs,
            db=db
        )
        return response
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate chat response: {str(e)}"
        )
```

## Part 9: Register Routes in Main App

Update `app/main.py`:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import chat, auth, users  # Import auth and users routes
from app.database import engine
from app.models import user  # Import user model

# Create database tables
user.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Tomoiru Backend",
    description="RAG-powered Japan travel guide with authentication",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Next.js dev server
        # Add production URLs later
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(auth.router)  # Auth routes
app.include_router(users.router)  # User management routes
app.include_router(chat.router)  # Chat routes (now protected)

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "app_name": "Tomoiru Backend",
        "version": "1.0.0",
        "features": ["authentication", "rag_chat"]
    }
```

## Part 10: Update Database Connection

Make sure `app/database.py` has the `get_db` dependency:

```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    """Database session dependency"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

## Testing the Backend

### 1. Start the backend:
```bash
cd /path/to/tomoiru-backend
source venv/bin/activate
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### 2. Test OAuth Flow:
- Visit: `http://localhost:8000/api/v1/auth/login/google`
- Should redirect to Google login
- After approval, redirects to frontend with token

### 3. Test Email/Password Signup:
```bash
curl -X POST http://localhost:8000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "securepassword123"
  }'
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": "uuid-here",
    "email": "test@example.com",
    "user_name": null,
    "auth_provider": "email",
    "created_at": "2025-01-19T..."
  }
}
```

### 4. Test Protected Chat Endpoint:
```bash
TOKEN="your-jwt-token-here"

curl -X POST http://localhost:8000/api/v1/chat/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "message": "Where can I find good ramen in Tokyo?",
    "num_context_docs": 3
  }'
```

## Common Issues & Solutions

### Issue: `authlib` errors
**Solution:** Install authlib with starlette support:
```bash
pip install authlib[starlette]
```

### Issue: JWT secret key errors
**Solution:** Generate a secure key:
```bash
openssl rand -hex 32
```
Add to `.env` as `JWT_SECRET_KEY`

### Issue: Google OAuth redirect mismatch
**Solution:** Ensure `GOOGLE_REDIRECT_URI` in `.env` matches exactly what's configured in Google Cloud Console

### Issue: CORS errors
**Solution:** Verify frontend URL is in `allow_origins` list in `main.py`

## Next Steps

Once backend is working:
1. ✅ Test all endpoints with Postman/curl
2. ✅ Verify JWT tokens are generated correctly
3. ✅ Test protected `/api/v1/chat/` endpoint
4. ➡️ Move to frontend integration (see `FRONTEND_INTEGRATION.md`)

---

**Backend authentication is now complete!** 🎉

You now have:
- ✅ Google OAuth login
- ✅ Email/Password authentication
- ✅ JWT token generation and validation
- ✅ Protected chat endpoint
- ✅ User profile management

Ready to integrate with the frontend!
