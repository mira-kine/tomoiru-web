import { checkError, client } from './client';

export async function getTomo(id) {
  try {
    const { data, error } = await client
      .from('tomos')
      .select()
      .eq('uuid', id)
      .single();
    if (error) {
      throw error;
    }

    if (data) {
      return { ...data };
    }
    //   if none then return null
  } catch (error) {
    throw error;
  }
}

export async function createTomo(currentUser, tomo) {
  const resp = await client.from('tomos').insert({
    uuid: currentUser.id,
    name: tomo.name,
    avatar: tomo.avatar,
  });

  await client
    .from('users')
    .update({ has_tomo: true })
    .eq('id', currentUser.id);

  return checkError(resp);
}
