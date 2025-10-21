import Albums from './Albums.js';
import PolaroidFrame from './PolaroidFrame.js';
import { getAlbum } from '../../api/getAlbum.js';
import Background from '../../assets/main_bg.png';
import Divider from '../../components/Divider.js';
import LoadingSpinner from '../../components/LoadingSpinner.js';
import { useState } from '../../hooks/useState.js';

function Album({ params }) {
  const { albumId } = params;
  const [data, setData] = useState(null);

  if (data === null) {
    (async function getAlbumData() {
      const { imageUrl, title, description, frameColor } =
        await getAlbum(albumId);

      setData({ imageUrl, title, description, frameColor });
    })();
  }

  return (
    <>
      <LoadingSpinner loading={data === null ? true : false} />
      <div className="bg-background">
        <div
          className="min-h-160 bg-cover bg-center"
          style={{ backgroundImage: `url(${Background})` }}
        >
          <div className="pt-10 md:pt-30 flex gap-5 pb-20 mx-auto flex-col md:flex-row min-w-90 md:w-180 xl:w-280">
            {/* 추후 사진 클릭 시 전체 화면으로 볼 수 있게 띄우기 */}
            <PolaroidFrame
              title={''}
              className={
                'w-90 h-75 md:w-96 md:h-80 xl:w-120 xl:h-100 shadow-xl p-5'
              }
              frameColor={data?.frameColor || 'white'}
              imageUrl={data?.imageUrl || ''}
            />
            <div className="mx-auto w-90 md:w-120">
              <div className="flex justify-between mt-5 items-center">
                <h2 className="text-xl md:text-lg xl:text-2xl ">
                  {data?.title || ''}
                </h2>
                {/* 추후 수정 삭제 기능 추가 */}
              </div>
              <p className="text-md  mt-10  md:text-md xl:text-xl">
                {data?.description || ''}
              </p>
            </div>
          </div>
        </div>
        <Divider />
        <Albums />
      </div>
    </>
  );
}

export default Album;
