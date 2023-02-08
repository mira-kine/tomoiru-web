import { client } from './client';

// get User
export function getUser() {
  return client.auth.session();
}

// get Session
export function getSession() {
  return client.auth.session();
}

// sign up user
export async function signUpUser(email, password) {
  const { user, error } = await client.auth.signUp({ email, password });
  if (error) throw error;
  return user;
}

// sign in user

// sign out user
