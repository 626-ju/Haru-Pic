import Background from '../../assets/main_bg.png';
import Button from '../../components/Button.js';
import Divider from '../../components/Divider.js';
import { router } from '../../components/Router/Router.js';

const Landing = () => {
  return (
    <div>
      <div
        className=" bg-white min-h-[90vh] pb-9 bg-cover bg-center mt-[-60px]"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className="w-80 md:w-114 xl:w-122 mx-auto text-center break-words pt-60 ">
          <h2 className="text-2xl md:text-[32px] xl:text-[40px] break-normal font-family-Iropke text-black-500 xl:leading-16 md:leading-12 leading-10">
            잊어버리기엔 <br />
            아까운 추억들이 있지 않나요?
          </h2>
          <p className="mt-2 md:mt-6 xl:mt-10 text-sm md:text-xl text-black-300 font-family-Iropke">
            다른 사람들과 공유해보세요
          </p>
          <Button onClick={() => router.push('/albums')}>시작하기</Button>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default Landing;
