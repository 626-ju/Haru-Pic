export async function getAlbumList() {
  const response = await fetch(
    `https://linkshop-api.vercel.app/626626/linkshops`, //무조건 12개씩 보내주네
  );

  if (!response.ok) {
    console.error('가져오기 실패');
  }

  const data = await response.json();

  return data.list;
}
