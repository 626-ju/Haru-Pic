import clsx from "clsx";

const LandingSection = ({ textFirst, title, paragraph }) => {

  return (
    <div className="flex justify-center items-center h-[90vh]">

      <div className=" flex flex-col xl:flex-row  gap-10  xl:gap-0 xl:justify-between xl:items-end bg-background mx-auto  w-78 md:w-91 xl:w-[1188px]">
        {/* mt-31 mb-50 xl:mt-60 xl:mb-95 */}
        <div className="xl:order-1 w-78 h-[210px] md:w-91 md:h-60 xl:w-186 xl:h-97  bg-amber-400 rounded-2xl" />
        <div className={textFirst ? 'xl:order-0' : 'xl:order-1'}>
          <h3 className={clsx('text-black-950  text-xl xl:text-3xl font-bold  leading-8 xl:leading-12 mb-4 md:mb-5 xl:mb-10 whitespace-pre-line',
            textFirst ? 'text-right' : 'text-left')}>{title}</h3>
          <p className={clsx('text-blue-500 whitespace-pre-line',
            textFirst ? 'text-right' : 'text-left'
          )}>{paragraph}</p>
        </div>
      </div>
    </div>
  );
};

export default LandingSection;
