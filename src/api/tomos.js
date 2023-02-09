import { checkError, client } from './client';

export async function getTomo(id) {
  try {
    const request = await client
      .from('tomos')
      .select()
      .match({ uuid: id })
      .single();

    if (!request) {
      return null;
    }

    return request;
    //   if none then return null
  } catch (error) {
    throw error;
  }
}

export async function createTomo(currentUser, tomo) {
  const resp = await client.from('tomos').insert({
    uuid: currentUser.id,
    name: tomo.name,
  });

  const req = await client
    .from('users')
    .update({ has_tomo: true })
    .eq('id', currentUser.id);

  console.log('req', req);

  return checkError(resp);
}
