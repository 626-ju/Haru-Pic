import Logo from './Logo.js';
import Link from './Router/Link.js';
import { router } from './Router/Router.js';

const Gnb = () => {
  return (
    <div className="fixed top-0 z-50 w-full flex justify-between px-6 md:px-18 xl:px-30 h-20 items-center bg-white">
      <Link to="/">
        <Logo />
      </Link>
      <button
        className="cursor-pointer text-[40px] hover:text-gray-300"
        onClick={() => router.push('/newpost')}
        title="새 글 작성하기"
      >
        +
      </button>
    </div>
  );
};

export default Gnb;
