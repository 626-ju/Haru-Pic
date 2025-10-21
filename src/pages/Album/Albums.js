import PolaroidFrame from './PolaroidFrame.js';

import { getAlbumList } from '../../api/getAlbumList.js';
import Link from '../../components/Router/Link.js';
import { useState } from '../../hooks/useState.js';
import {
  cn,
  parseFrameColor,
  parseImageUrl,
  parseTitle,
} from '../../lib/utils.js';

import PolaroidSkeleton from './PolaroidSkeleton.js';

function Albums() {
  const [albums, setAlbums] = useState(null);

  if (albums === null) {
    (async function getListData() {
      const list = await getAlbumList();
      setAlbums(list);
    })();
  }

  return (
    <div className="min-w-[375px] pt-40 bg-background pb-30">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-10 mx-auto w-90 md:w-190 xl:w-280">
        {albums && albums.length > 0
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
}

export default Albums;
