function getAlbumKey() {
  const storedId = localStorage.getItem('ALBUM_KEY');
  if (storedId) {
    return storedId;
  }
}

export default getAlbumKey;
