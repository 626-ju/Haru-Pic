import logo from '../assets/logo.svg';
import { cn } from '../lib/utils.js';

const Logo = ({ className }) => {
  return (
    <a href="/">
      <img className={cn('w-[172px] h-12', className)} src={logo} alt="로고" />
    </a>
  );
};

export default Logo;
