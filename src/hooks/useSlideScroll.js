const useSlideScroll = () => {
  let currentSection = 0;
  let totalSections = 5;
  let isScrolling = false;

  const SCROLL_THRESHOLD = 100;
  let scrollTimer = null;
  let accumulatedDelta = 0;

  let slideContainer = null;

  document.addEventListener('DOMContentLoaded', () => {
    slideContainer = document.getElementById('slideContainer');

    (function initSlideScroll() {
      document.addEventListener(
        'wheel',
        (e) => {
          e.preventDefault();
          if (isScrolling) return;

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
        },
        { passive: false },
      );
    })();
  });

  function goToSection(index) {
    if (isScrolling) return;

    currentSection = index;
    isScrolling = true;
    slideContainer.style.transform = `translateY(-${index * 90}vh)`;

    setTimeout(() => (isScrolling = false), 200);
  }
};

export default useSlideScroll;
