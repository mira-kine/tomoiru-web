import { client } from './client';

// get User
export async function getCurrentUser() {
  try {
    const session = await client.auth.getSession();
    const {
      data: { user },
    } = await client.auth.getUser();

    if (!user || !session) {
      return null;
    }

    const { data, error } = await client
      .from('users')
      .select('*')
      .match({ id: user.id })
      .single();

    if (error) {
      throw error;
    }

    if (data) {
      return { ...data };
    }
  } catch (error) {
    throw error;
  }
}

export async function signInWithGoogle() {
  const { data, error } = await client.auth.signInWithOAuth(
    {
      provider: 'google',
    },
    {
      redirectTo: 'http://localhost:3000/provider?refresh=true',
    }
  );

  if (error) throw error;
  return data;
}
