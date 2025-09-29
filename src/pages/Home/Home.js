import Landing from './Landing.js';
import LandingSection from './LandingSection.js';
import LandingBottom from './LandingBottom.js';
import useSlideScroll from '../../hooks/useSlideScroll.js';

const Home = () => {
  useSlideScroll();
  document.body.style.overflow = 'hidden'; //추후 클린 업으로 치워야할듯?

  return (
    <div
      id="slideContainer"
      className="bg-background  transition-transform duration-700 ease-in-out"
    >
      <Landing />
      <LandingSection
        title={`명언이나 글귀,
       토막 상식들을 공유해 보세요.`}
        paragraph={`나만 알던 소중한 글들을 다른 사람들에게 전파하세요.`}
      />
      <LandingSection
        textFirst={true}
        title={`감정 상태에 따라, 
        알맞은 위로를 받을 수 있어요.`}
        paragraph={`태그를 통해 글을 모아 볼 수 있어요.`}
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
