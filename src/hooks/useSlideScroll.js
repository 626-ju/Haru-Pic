import { addCleanup } from '../components/Router/Router.js';

const useSlideScroll = () => {
  let currentSection = 0;
  const totalSections = 5;

  let isScrolling = false;

  const SCROLL_THRESHOLD = 50;

  let scrollTimer = null;

  //방향감지용
  let accumulatedDelta = 0;

  let slideContainer = null;

  setTimeout(() => {
    slideContainer = document.getElementById('slideContainer');

    if (slideContainer) {
      //스크롤바 위치 기억 없애기
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }

      window.addEventListener('wheel', handleWheelEvent, { passive: false });
      document.body.style.overflow = 'hidden';
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
        // 아래로
        if (accumulatedDelta > 0 && currentSection < totalSections - 1) {
          moveSection(currentSection + 1);
        }
        //위로
        else if (accumulatedDelta < 0 && currentSection > 0) {
          moveSection(currentSection - 1);
        }
      }

      accumulatedDelta = 0;
    }, 10);
  }

  function moveSection(targetSection) {
    if (isScrolling) {
      return;
    }

    currentSection = targetSection;
    isScrolling = true;

    window.scrollTo({
      top: targetSection * window.innerHeight * 0.9,
      behavior: 'smooth',
    });

    setTimeout(() => {
      isScrolling = false;
    }, 700);
  }

  function cleanup() {
    window.removeEventListener('wheel', handleWheelEvent);
    clearTimeout(scrollTimer);
    document.body.style.overflow = '';
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'auto';
    }
  }

  addCleanup(cleanup);
};

export default useSlideScroll;
