import { client } from './client';

export async function uploadTomo(pickedTomo) {
  const path = client.storage
    .from('tomo-image')
    .getPublicUrl(`tomo-options/${pickedTomo}.png`);

  const publicURL = path.data.publicUrl;
  return publicURL;
}
