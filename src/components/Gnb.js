import logo from '../assets/logo.svg';
import searchIcon from '../assets/search_ic.svg';

const Gnb = () => {
  return (
    <div className='w-full flex justify-between px-30 h-20 items-center bg-white'>
      <a href='/'>
        <img className='w-[172px] h-12' src={logo} alt='로고' />
      </a>
      <button>
        <img className='w-10 h-10' src={searchIcon} alt='검색 아이콘' />
      </button>
    </div>
  )
}

export default Gnb