import { client } from './client';

export async function getTomo({ id }) {
  try {
    const request = await client
      .from('tomos')
      .select()
      .match({ uuid: id })
      .single();

    if (!request) {
      return null;
    }
    //   receives id from user
    //   get session user id and match it with id in tomo
    // if no id in tomo exists, return null
    // return tomo
    // match user by Id, get from table

    return request;
    //   if none then return null
  } catch (error) {
    throw error;
  }
}
