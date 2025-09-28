import searchIcon from '../assets/search_ic.svg';
import Logo from './Logo.js';

const Gnb = () => {
  return (
    <div className="fixed top-0 z-50 w-full flex justify-between px-6 md:px-18 xl:px-30 h-20 items-center bg-white">
      <Logo />
      <button className='cursor-pointer'>
        <img className="w-10 h-10" src={searchIcon} alt="검색 아이콘" />
      </button>
    </div>
  );
};

export default Gnb;
