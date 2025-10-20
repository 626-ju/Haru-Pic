export async function getAlbum(albumId) {
  try {
    const response = await fetch(
      `https://linkshop-api.vercel.app/626626/linkshops/${albumId}`,
    );

    if (!response.ok) {
      console.error('가져오기 실패');
    }

    const data = await response.json();

    const { imageUrl, name } = data.products[0];
    const title = name.split(',')[0].replace('title:', '') || '';
    const description = name.split(',')[1].replace('description:', '') || '';
    const frameColor = name.split(',')[2].replace('frameColor:', '') || 'white';

    return { imageUrl, title, description, frameColor };
  } catch (error) {
    console.error('가져오기 실패:', error);
    alert('가져오기에 실패했습니다.');

    return null;
  }
}
