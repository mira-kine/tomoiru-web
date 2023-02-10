import { client } from './client';

export async function uploadTomo(uuid, file) {
  const ext = file.name.split('.').pop();
  await client.storage.from('tomo-image').upload(`image/${uuid}.${ext}`, file, {
    cacheControl: '3600',
    upsert: false,
  });
  const path = client.storage
    .from('tomo-image')
    .getPublicUrl(`image/${uuid}.${ext}`);

  const publicURL = path.data.publicUrl;
  return publicURL;
}
