import logo from '../assets/logo.png';
import { cn } from '../lib/utils.js';

const Logo = ({ className }) => {
  return (
    <a href="/" title="홈으로 이동">
      <img className={cn('w-[172px] h-12', className)} src={logo} alt="로고" />
    </a>
  );
};

export default Logo;
