import { flatErrorMessage } from '../lib/flatErrorMessage.js';
import getAlbumKey from '../lib/getAlbumKey.js';

export async function deleteAlbum(albumId) {
  //   const ALBUM_KEY = getAlbumKey(); //실제 앱 사용할 때
  const ALBUM_KEY = process.env.ALBUM_KEY; // 포폴용 고정id

  try {
    const response = await fetch(
      `https://linkshop-api.vercel.app/${ALBUM_KEY}/linkshops/${albumId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentPassword: '123456' }),
      },
    );

    if (!response.ok) {
      const data = await response.json();
      const errorMessage = flatErrorMessage(data).message;
      throw new Error(errorMessage);
    }

    alert('삭제에 성공했습니다.');
    return true;
  } catch (error) {
    console.error('삭제 실패:', error.message);
    alert(error.message || '삭제에 실패했습니다.');
    return false;
  }
}
