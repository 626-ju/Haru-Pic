import { router } from '../components/Router/Router.js';

function checkKeyGuard(currentPath) {
  const storedKey = localStorage.getItem('ALBUM_KEY');

  const keyGuardPages = ['/albums', '/album', '/newpost'];

  const needKey = keyGuardPages.some((page) => currentPath.startsWith(page));

  if (!storedKey && needKey) {
    router.push('/identify');
  }
}

export default checkKeyGuard;
