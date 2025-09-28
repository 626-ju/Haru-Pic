import clsx from 'clsx';
import logo from '../assets/logo.svg';

const Logo = ({ className }) => {
  return (
    <a href="/">
      <img className={clsx("w-[172px] h-12", className)} src={logo} alt="로고" />
    </a>
  )
}

export default Logo