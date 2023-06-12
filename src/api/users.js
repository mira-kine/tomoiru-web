import { client, checkError } from './client';

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
      localStorage.setItem('authenticated', true);
      return data;
    }
  } catch (error) {
    throw error;
  }
}

export async function signUpUser(email, password) {
  const {
    data: { user, error },
  } = await client.auth.signUp({ email, password });

  if (error) {
    throw error;
  }

  return checkError(user);
}

export async function signInUser(email, password) {
  const {
    data: { user },
    error,
  } = await client.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return user;
}

export async function updateUserName(userName) {
  // take current user info from currentUser AFTER useUser updates it to local storage and user state
  // update server with it according to the id of currentUser
  const resp = await client.from('users').update(userName).eq('name', userName);
  return checkError(resp);
}

export async function signOut() {
  const { error } = await client.auth.signOut();

  if (error) throw error;
}

// Have to keep oauth on hold because supabase issues

// export async function signInWithGoogle() {
//   const { data, error } = await client.auth.signInWithOAuth(
//     {
//       provider: 'google',
//     },
//     {
//       redirectTo: 'http://localhost:3000/provider?refresh=true',
//     }
//   );

//   if (error) throw error;
//   return data;
// }
