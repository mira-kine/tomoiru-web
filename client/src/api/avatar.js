import { client } from './client';

export async function uploadTomo(pickedTomo) {
  const myTomo = pickedTomo['tomoId'];
  const path = client.storage
    .from('tomo-image')
    .getPublicUrl(`tomo-options/${myTomo}.png`);

  const publicURL = path.data.publicUrl;
  return publicURL;
}
