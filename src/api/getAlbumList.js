import getAlbumKey from '../lib/getAlbumKey.js';

export async function getAlbumList(nextCursor = 0) {
  const ALBUM_KEY = getAlbumKey();

  const response = await fetch(
    `https://linkshop-api.vercel.app/${ALBUM_KEY}/linkshops?cursor=${nextCursor}`, //무조건 12개씩 보내주네
  );

  if (!response.ok) {
    console.error('가져오기 실패');
  }

  const data = await response.json();

  return data;
}
