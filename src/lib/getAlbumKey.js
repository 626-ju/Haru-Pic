import { router } from "../components/Router/Router.js";

function getAlbumKey() {
  const storedId = localStorage.getItem('ALBUM_KEY');

  if (storedId) {
    return storedId
  } else {
    if (window.location.pathname !== '/identify') {
      setTimeout(() => {
        router.push('/identify');
      }, 0);
    }
    return null
  }
}

export default getAlbumKey