import clsx from 'clsx';
import divider from '../assets/divider.png';

const Divider = ({ className }) => {
  return (
    <img
      src={divider}
      alt="구분선"
      className={clsx('mt-[-1vh] md:mt-[-1.5vh] xl:mt-[-2vh]', className)}
    />
  );
};

export default Divider;
