export async function uploadImage(file) {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('YOUR_S3_UPLOAD_API_ENDPOINT', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('업로드 실패:', error);
    alert('업로드에 실패했습니다.');
    return null;
  }
}