

const useSlideScroll = () => {

  let currentSection = 0;
  let totalSections = 5;
  let isScrolling = false;

  document.addEventListener('DOMContentLoaded', () => {

    (function initSlideScroll() {

      document.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (isScrolling) return;

        if (e.deltaY > 0 && currentSection < totalSections - 1) {
          goToSection(currentSection + 1);
        } else if (e.deltaY < 0 && currentSection > 0) {
          goToSection(currentSection - 1);
        }
      }, { passive: false });
    })();
  });


  function goToSection(index) {
    if (isScrolling) return;

    currentSection = index;
    isScrolling = true;
    slideContainer.style.transform = `translateY(-${index * 90}vh)`;

    setTimeout(() => isScrolling = false, 200);
  }
}

export default useSlideScroll