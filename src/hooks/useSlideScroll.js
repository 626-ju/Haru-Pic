import { addCleanup } from '../components/Router/Router.js';

const useSlideScroll = () => {
  let currentSection = 0;
  const totalSections = 5;
  let isScrolling = false;

  const SCROLL_THRESHOLD = 100;
  let scrollTimer = null;
  let accumulatedDelta = 0;

  let slideContainer = null;

  //DOMContenloaded는 한번만 되니까 클린 업 후에도 리스너 추가하기 위해 setTimeout 0
  setTimeout(() => {
    slideContainer = document.getElementById('slideContainer');

    if (slideContainer) {
      document.addEventListener('wheel', handleWheelEvent, { passive: false });
    }
  }, 0);

  function handleWheelEvent(e) {
    e.preventDefault();
    if (isScrolling) {
      return;
    }

    clearTimeout(scrollTimer);
    accumulatedDelta += e.deltaY;

    scrollTimer = setTimeout(() => {
      if (Math.abs(accumulatedDelta) >= SCROLL_THRESHOLD) {
        if (accumulatedDelta > 0 && currentSection < totalSections - 1) {
          goToSection(currentSection + 1);
        } else if (accumulatedDelta < 0 && currentSection > 0) {
          goToSection(currentSection - 1);
        }
      }
      accumulatedDelta = 0;
    }, 30);
  }

  function goToSection(index) {
    if (isScrolling) {
      return;
    }

    currentSection = index;
    isScrolling = true;
    slideContainer.style.transform = `translateY(-${index * 90}vh)`;

    setTimeout(() => (isScrolling = false), 200);
  }

  function cleanup() {
    document.removeEventListener('wheel', handleWheelEvent);
    clearTimeout(scrollTimer);
  }

  addCleanup(cleanup);
};

export default useSlideScroll;
