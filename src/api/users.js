import { client } from './client';

// get User
export async function getUser() {
  try {
    const session = await client.auth.getSession();
    const {
      data: { user },
    } = await client.auth.getUser();
    console.log('user', user);
    if (!user || !session) {
      return null;
    }

    const { data, error, status } = await client
      .from('users')
      .select('id')
      .match({ id: user.id })
      .single();

    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      return { ...user, ...data };
    }
  } catch (error) {
    throw error;
  }
}

export async function signInWithGoogle() {
  const { data, error } = await client.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) throw error;
  return data;
}
