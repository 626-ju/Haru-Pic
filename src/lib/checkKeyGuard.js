import { router } from '../components/Router/Router.js';

function checkKeyGuard(currentPath) {
  // const storedKey = localStorage.getItem('ALBUM_KEY'); 
  const storedKey = process.env.ALBUM_KEY//포폴용

  const keyGuardPages = ['/albums', '/album', '/newpost'];

  const needKey = keyGuardPages.some((page) => currentPath.startsWith(page));

  if (!storedKey && needKey) {
    router.push('/identify');
  }
}

export default checkKeyGuard;
