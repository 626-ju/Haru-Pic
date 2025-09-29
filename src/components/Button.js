import clsx from 'clsx';

const Button = ({
  variant = 'default',
  onClick,
  className,
  children,
  ...props
}) => {
  const BtnVariant = {
    default:
      'mt-6 md:mt-8 xl:mt-12 text-white xl:text-xl bg-black-500 rounded-xl py-3 px-6 xl:py-4 xl:px-27 hover:bg-black-300 cursor-pointer',
  };

  return (
    <button
      {...props}
      onClick={onClick}
      className={clsx(BtnVariant[variant], className)}
    >
      {children}
    </button>
  );
};

export default Button;
