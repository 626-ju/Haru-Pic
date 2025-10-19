import divider from '../assets/divider.png';
import { cn } from '../lib/utils.js';

const Divider = ({ className }) => {
  return (
    <img
      src={divider}
      alt="구분선"
      className={cn('mt-[-1vh] md:mt-[-1.5vh] xl:mt-[-2vh]', className)}
    />
  );
};

export default Divider;
