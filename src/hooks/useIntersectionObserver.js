import { addCleanup } from '../components/Router/Router.js';

let observer = null;

export function useIntersectionObserver(albums, targetId, callback) {
  if (albums.list && albums.nextCursor !== null) {
    setTimeout(() => {
      const target = document.getElementById(targetId);
      if (target && !target.dataset.observed) {
        target.dataset.observed = 'true';

        observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              callback();
            }
          },
          { threshold: 0.1 },
        );
        observer.observe(target);

        //라우터 이동 시 disconnect
        addCleanup(() => {
          if (observer) {
            observer.disconnect();
            observer = null;
          }
          const el = document.getElementById(targetId);
          if (el) {
            delete el.dataset.observed;
          }
        });
      }
    }, 0);
  }

  //nextCursor===null 일떄 disconnect
  if (albums.nextCursor === null && observer) {
    observer.disconnect();
    observer = null;

    const target = document.getElementById(targetId);
    if (target) {
      delete target.dataset.observed;
    }
  }
}
