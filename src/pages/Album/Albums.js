import { getAlbumList } from '../../api/getAlbumList.js';
import Link from '../../components/Router/Link.js';
import { useState } from '../../hooks/useState.js';
import {
  cn,
  parseFrameColor,
  parseImageUrl,
  parseTitle,
} from '../../lib/utils.js';
import PolaroidFrame from './PolaroidFrame.js';
import PolaroidSkeleton from './PolaroidSkeleton.js';

const Albums = () => {
  const [albums, setAlbums] = useState(null);
  const [init, setInit] = useState(false);

  if (!init) {
    (async function getListData() {
      const list = await getAlbumList();
      setAlbums(list);
      setInit(true);
    })();
  }

  return (
    <div className="min-w-[375px] pt-40 bg-background pb-30">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-10 mx-auto w-90 md:w-190 xl:w-280">
        {init
          ? albums.map((data) => {
              return (
                <Link to={`/album/${data.id}`}>
                  <PolaroidFrame
                    title={parseTitle(data)}
                    imageUrl={parseImageUrl(data)}
                    frameColor={parseFrameColor(data)}
                  />
                </Link>
              );
            })
          : Array.from({ length: 8 }).map((_, index) => (
              <PolaroidSkeleton
                key={index}
                className={cn(index >= 6 && 'md:hidden xl:block')}
              />
            ))}
      </div>
    </div>
  );
};

export default Albums;
