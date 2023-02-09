import { checkError, client } from './client';

export async function uploadTomo(uuid, file) {
  const ext = file.name.split('.').pop();
  await client.storage
    .from('tomo-image')
    .upload(`${uuid}.${ext}`, file, { upsert: true });
  const { publicURL } = client.storage
    .from('tomos')
    .getPublicUrl(`${uuid}.${ext}`);
  const resp = await client
    .from('tomos')
    .update({ avatar: publicURL })
    .eq('uuid', uuid)
    .single();
  return checkError(resp);
}
