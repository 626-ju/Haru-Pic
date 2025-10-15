import Background from '../../assets/main_bg.png';
import Divider from '../../components/Divider.js';
import Albums from './Albums.js';
import PolaroidFrame from './PolaroidFrame.js';

const Album = ({ params }) => {
  const { albumId } = params;
  console.log(albumId)
  
  return (
    <div className="bg-background">
      <div
        className="min-h-160 bg-cover bg-center"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className="pt-30 flex gap-10 pb-20 mx-auto w-200 xl:w-280">
          {/* 추후 사진 클릭 시 전체 화면으로 볼 수 있게 띄우기 */}
          <PolaroidFrame
            title={''}
            className={'w-120 h-100 md:w-120 md:h-100 shadow-xl p-5'}
          />
          <div>
            <h2 className="text-2xl mt-5">사진 제목</h2>
            <p className="mt-10 text-xl">
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
