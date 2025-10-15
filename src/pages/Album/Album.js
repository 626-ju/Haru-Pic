import Albums from './Albums.js';
import PolaroidFrame from './PolaroidFrame.js';
import Background from '../../assets/main_bg.png';
import Divider from '../../components/Divider.js';

const Album = ({ params }) => {
  const { albumId } = params;
  console.log(albumId);

  return (
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
              'w-90 h-75 md:w-120 md:h-100 md:w-120 md:h-100 shadow-xl p-5'
            }
          />
          <div className="mx-auto w-90 md:w-120">
            <h2 className="text-xl md:text-2xl mt-5">사진 제목</h2>
            <p className="text-md mt-10 md:text-xl">
              사진에 대한 추억 및 설명 사진에 대한 추억 및 설명 사진에 대한 추억
              및 설명 사진에 대한 추억 및 설명
            </p>
          </div>
        </div>
      </div>
      <Divider />
      <Albums />
    </div>
  );
};

export default Album;
