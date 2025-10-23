import { flatErrorMessage } from '../lib/flatErrorMessage.js';
import getAlbumKey from '../lib/getAlbumKey.js';

export async function getAlbumList(nextCursor = 0) {
  const ALBUM_KEY = getAlbumKey();

  try {
    const response = await fetch(
      `https://linkshop-api.vercel.app/${ALBUM_KEY}/linkshops?cursor=${nextCursor}`, //무조건 12개씩 보내주네
    );

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = flatErrorMessage(data).message;
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error('가져오기 실패:', error);
  }
}
