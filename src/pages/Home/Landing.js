import Background from '../../assets/main_bg.png';
import Divider from '../../components/Divider.js';
import Button from '../../components/Button.js';
import { useState } from '../../hooks/useState.js';

const Landing = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log(count);
    setCount(count + 1);
  };

  return (
    <div>
      <div
        className=" bg-white min-h-[90vh] pb-9 bg-cover bg-center"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className="w-68 md:w-92 xl:w-114 mx-auto text-center break-words pt-50 md:pt-51 xl:pt-80">
          <h2 className="text-2xl md:text-[32px] xl:text-[40px] break-normal font-family-Iropke text-black-500 xl:leading-16 md:leading-12 leading-10">
            나만 갖고 있기엔 <br />
            아까운 책들이 있지 않나요?
          </h2>
          <p className="mt-2 md:mt-6 xl:mt-10 text-sm md:text-xl text-black-300 font-family-Iropke">
            다른 사람들과 공유해보세요
          </p>
          <Button onClick={handleClick}>시작하기</Button>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default Landing;
