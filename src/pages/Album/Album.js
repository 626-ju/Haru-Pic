import Albums from './Albums.js';
import PolaroidFrame from './PolaroidFrame.js';
import { getAlbum } from '../../api/getAlbum.js';
import Background from '../../assets/main_bg.png';
import Divider from '../../components/Divider.js';
import LoadingSpinner from '../../components/LoadingSpinner.js';
import { useState } from '../../hooks/useState.js';
import trash from '../../assets/trash.svg';
import { deleteAlbum } from '../../api/deleteAlbum.js';
import { router } from '../../components/Router/Router.js';

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

  async function handleDelete() {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    const prevData = data;

    setData(''); // null이면 위에 fetch가 트리거 되는 거 조심
    const response = await deleteAlbum(albumId);

    if (response) {
      response && router.push('/albums');
    } else {
      setData(prevData);
    }
  }

  return (
    <div>
      <LoadingSpinner loading={!data ? true : false} />
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
                <button
                  onClick={handleDelete}
                  className="opacity-30 hover:opacity-100 transition-transform hover:scale-110 cursor-pointer rounded-md border-1 border-gray-500"
                >
                  <img className="w-6 h-6" src={trash} alt="삭제 아이콘" />
                </button>
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
    </div>
  );
}

export default Album;
