import { addCleanup } from '../components/Router/Router.js';
import { useKebabStore } from '../store/kebabStore.js';

let isRegisted = false; //document에 리스너 중복등록 방지

export function useKebabOutside() {
  const allClose = useKebabStore.getState().allClose;

  if (!isRegisted) {
    document.addEventListener('click', handleClick);
    isRegisted = true;
  }

  function handleClick(e) {
    const isKebabClick = e.target.closest('[data-kebab');

    if (!isKebabClick) {
      allClose();
    }
  }

  function cleanup() {
    document.removeEventListener('click', handleClick);
    isRegisted = false;
  }

  addCleanup(cleanup);
}
