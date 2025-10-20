import {
  parseDescription,
  parseFrameColor,
  parseImageUrl,
  parseTitle,
} from '../lib/utils.js';

export async function getAlbum(albumId) {
  try {
    const response = await fetch(
      `https://linkshop-api.vercel.app/626626/linkshops/${albumId}`,
    );

    if (!response.ok) {
      console.error('가져오기 실패');
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
