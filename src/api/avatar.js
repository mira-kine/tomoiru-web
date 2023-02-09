import { checkError, client } from './client';

export async function uploadTomo(uuid, file) {
  const ext = file.name.split('.').pop();
  await client.storage
    .from('tomos')
    .select('avatar')
    .upload(`tomo-image/${uuid}.${ext}`, file, { upsert: true });
  const { publicURL } = await client.storage
    .from('tomos')
    .select('avatar')
    .getPublicUrl(`tomo-image/${uuid}.${ext}`);
  const resp = await client
    .from('tomos')
    .update({ avatar: publicURL })
    .eq('uuid', uuid)
    .single();
  return checkError(resp);
}
