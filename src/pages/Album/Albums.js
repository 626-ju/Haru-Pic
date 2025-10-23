import PolaroidFrame from './PolaroidFrame.js';
import PolaroidSkeleton from './PolaroidSkeleton.js';
import { getAlbumList } from '../../api/getAlbumList.js';
import Link from '../../components/Router/Link.js';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver.js';
import { useState } from '../../hooks/useState.js';
import listEmpty from '../../assets/list-empty.svg';
import {
  cn,
  parseFrameColor,
  parseImageUrl,
  parseTitle,
} from '../../lib/utils.js';

function Albums() {
  const [albums, setAlbums] = useState({
    list: null,
    nextCursor: 0,
  });

  if (albums.list === null) {
    (async function getListData() {
      const data = await getAlbumList();
      setAlbums(data);
    })();
  }

  async function loadMore() {
    if (albums.nextCursor === null) {
      return;
    }
    const data = await getAlbumList(albums.nextCursor);

    setAlbums((prev) => ({
      list: [...prev.list, ...data.list],
      nextCursor: data.nextCursor,
    }));
  }

  //useRef 없으니 id 넘기기
  const OBSERVE_TARGET = 'loadMore';
  useIntersectionObserver(albums, OBSERVE_TARGET, loadMore);

  return (
    <div className="min-w-[375px] pt-40 bg-background pb-30">
      <div
        className={cn(
          'hidden w-full h-full  ',
          albums.list !== null &&
            albums.list.length === 0 &&
            'flex flex-col justify-center items-center',
        )}
      >
        <img
          src={listEmpty}
          alt="빈 앨범 안내"
          className="block w-[375px] h-[375px]"
        />
        <p className="text-2xl mt-10">새로운 앨범을 등록해보세요</p>
      </div>
      <div
        className={cn(
          'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-10 mx-auto w-90 md:w-190 xl:w-280',
          albums.list !== null && albums.list.length === 0 && 'hidden',
        )}
      >
        {albums.list === null
          ? Array.from({ length: 8 }).map((_, index) => (
              <PolaroidSkeleton
                key={index}
                className={cn(index >= 6 && 'md:hidden xl:block')}
              />
            ))
          : albums.list.map((data) => {
              return (
                <Link to={`/album/${data.id}`} key={data.id}>
                  <PolaroidFrame
                    title={parseTitle(data)}
                    imageUrl={parseImageUrl(data)}
                    frameColor={parseFrameColor(data)}
                  />
                </Link>
              );
            })}
      </div>

      {/* 옵저버 트리거 */}
      <div
        id={OBSERVE_TARGET}
        className={cn('hidden w-10 h-5', albums.nextCursor !== null && 'block')}
      />
    </div>
  );
}

export default Albums;
