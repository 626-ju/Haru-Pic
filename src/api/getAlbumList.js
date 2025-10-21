export async function getAlbumList(nextCursor = 0) {
  const response = await fetch(
    `https://linkshop-api.vercel.app/626626/linkshops?cursor=${nextCursor}`, //무조건 12개씩 보내주네
  );

  if (!response.ok) {
    console.error('가져오기 실패');
  }

  const data = await response.json();

  return data;
}
