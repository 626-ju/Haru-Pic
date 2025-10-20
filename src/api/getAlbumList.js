export async function getAlbumList() {
  const response = await fetch(
    `https://linkshop-api.vercel.app/626626/linkshops`,
  );

  if (!response.ok) {
    console.error('가져오기 실패');
  }

  const data = await response.json();

  return data.list;
}
