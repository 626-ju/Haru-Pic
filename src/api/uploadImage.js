export async function uploadImage(file) {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(
      'https://linkshop-api.vercel.app/images/upload',
      {
        method: 'POST',
        body: formData,
      },
    );

    if (!response.ok) {
      console.error('업로드 실패');
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('업로드 실패:', error);
    alert('업로드에 실패했습니다.');
    return null;
  }
}
