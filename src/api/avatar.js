import { client } from './client';

// export async function getTomoImages() {
//   // get tomo images from storage
//   const { data, error } = await client.storage
//     .from('tomo-image')
//     .download('tomo-options/avatar1.png');
// }

export async function uploadTomo(uuid, pickedTomo) {
  // const ext = file.name.split('.').pop();
  // await client.storage.from('tomo-image').upload(`image/${uuid}.${ext}`, file, {
  //   cacheControl: '3600',
  //   upsert: false,
  // });
  const path = client.storage
    .from('tomo-image')
    .getPublicUrl(`tomo-options/${pickedTomo}.png`);

  const publicURL = path.data.publicUrl;
  return publicURL;
}
