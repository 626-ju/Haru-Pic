import getAlbumKey from "../lib/getAlbumKey.js";



export async function postAlbum(formData) {
  const ALBUM_KEY = getAlbumKey();

  const imageUrl = formData.get('imageUrl');
  const title = formData.get('title');
  const description = formData.get('description');
  const frameColor = formData.get('color');

  const requestBody = {
    shop: {
      imageUrl: 'https://example.com/...',
      urlName: 'string',
      shopUrl: 'https://example.com/...',
    },
    products: [
      {
        price: 0,
        imageUrl,
        name: `title:${title},description:${description},frameColor:${frameColor}`,
      },
    ],
    password: '123456',
    userId: title,
    name: '사용자입니다',
  };

  try {
    const response = await fetch(
      `https://linkshop-api.vercel.app/${ALBUM_KEY}/linkshops`,
      {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      console.error('업로드 실패');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('업로드 실패:', error);
    alert('업로드에 실패했습니다.');

    return null;
  }
}
