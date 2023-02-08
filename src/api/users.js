import { client } from './client';

// get User
export async function getUser() {
  try {
    const session = client.auth.getSession();

    console.log('session', session);
    let { data, error, status } = await client
      .from('users')
      .select(`uuid, display_name`)
      .eq('id', session.id)
      .single();

    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      return { ...session.user, ...data };
    }
  } catch (error) {
    throw error;
  }
}

// sign up user
export async function signUpUser(email, password) {
  const { user, error } = await client.auth.signUp({ email, password });
  if (error) throw error;

  const resp = await client.from('users').insert({ id: user.id }).single();
  if (resp.error) {
    throw error;
  }
  return { ...user, ...resp.data };
}

// sign in user
export async function signInUser(email, password) {
  const { user, error } = await client.auth.signInWithOtp({ email, password });
  if (error) throw error;
  return user;
}

// sign out user
