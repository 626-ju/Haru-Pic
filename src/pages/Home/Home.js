import Landing from './Landing.js';
import LandingBottom from './LandingBottom.js';
import LandingSection from './LandingSection.js';
import useSlideScroll from '../../hooks/useSlideScroll.js';

const Home = () => {
  useSlideScroll();

  return (
    <div
      id="slideContainer"
      className="bg-background  transition-transform duration-700 ease-in-out"
    >
      <Landing />
      <LandingSection
        title={`일상을 사진으로 보관하세요.`}
        paragraph={`소중한 추억들 잃어버리지 마세요.`}
      />
      <LandingSection
        textFirst={true}
        title={`기분에 따라, 
        알맞은 색을 기록할 수 있어요.`}
        paragraph={`폴라로이드의 색으로 표현하세요.`}
      />
      <LandingSection
        title={`내가 요즘 어떤 감정 상태인지 
      통계로 한눈에 볼 수 있어요.`}
        paragraph={`감정 달력으로 
        내 마음에 담긴 감정을 확인해보세요`}
      />
      <LandingBottom />
    </div>
  );
};

export default Home;
