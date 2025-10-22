import { useState } from '../hooks/useState.js';
import { cn } from '../lib/utils.js';

let listenerAdded = false;

function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);

  if (!listenerAdded) {
    function updateVisibility() {
      window.pageYOffset > 300 ? setIsVisible(true) : setIsVisible(false);
    }

    window.addEventListener('scroll', updateVisibility);

    listenerAdded = true;
  }

  function handleClick() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <button
      className={cn(
        'fixed bottom-8 right-8 w-16 h-16 cursor-pointer bg-gray-300 text-black-300 font-bold hover:bg-black-500 hover:text-white rounded-full shadow-lg transition-all duration-300 z-30',
        !isVisible && 'hidden',
      )}
      onClick={handleClick}
    >
      TOP
    </button>
  );
}

export default ScrollTop;
