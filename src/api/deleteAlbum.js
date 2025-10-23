import getAlbumKey from '../lib/getAlbumKey.js';

export async function deleteAlbum(albumId) {
  const ALBUM_KEY = getAlbumKey();

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
      throw new Error(data.errorMessage || response.status);
    }

    alert('삭제에 성공했습니다.');
    return true;
  } catch (error) {
    console.error('삭제 실패:', error);
    alert('삭제에 실패했습니다.');
  }
}
