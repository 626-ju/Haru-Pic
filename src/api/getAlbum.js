import getAlbumKey from '../lib/getAlbumKey.js';
import {
  parseDescription,
  parseFrameColor,
  parseImageUrl,
  parseTitle,
} from '../lib/utils.js';

export async function getAlbum(albumId) {
  const ALBUM_KEY = getAlbumKey();

  try {
    const response = await fetch(
      `https://linkshop-api.vercel.app/${ALBUM_KEY}/linkshops/${albumId}`,
    );

    if (!response.ok) {
      throw new Error(response.status)
    }

    const data = await response.json();

    const imageUrl = parseImageUrl(data) || '';

    const title = parseTitle(data) || '';
    const description = parseDescription(data) || '';
    const frameColor = parseFrameColor(data) || 'white';

    return { imageUrl, title, description, frameColor };
  } catch (error) {
    console.error('가져오기 실패:', error);
    alert('가져오기에 실패했습니다.');

    return null;
  }
}
