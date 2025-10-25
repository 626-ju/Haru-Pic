import Background from '../../assets/main_bg.png';
import Button from '../../components/Button.js';
import Divider from '../../components/Divider.js';
import Logo from '../../components/Logo.js';
import { router } from '../../components/Router/Router.js';

const LandingBottom = () => {
  return (
    <div className="h-[90vh]">
      <Divider className={'rotate-180 mb-[-1vh] md:mb-[-1.5vh] xl:mb-[-2vh]'} />
      <div
        className="bg-white h-[90vh] bg-cover bg-center py-100 flex items-center"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className="w-fit mx-auto flex flex-col items-center">
          <Logo />
          <Button onClick={() => router.push('/albums')}>시작하기</Button>
        </div>
      </div>
    </div>
  );
};

export default LandingBottom;
