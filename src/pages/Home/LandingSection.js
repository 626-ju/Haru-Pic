import { cn } from '../../lib/utils.js';

const LandingSection = ({ landingPic, textFirst, title, paragraph }) => {
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className=" flex flex-col xl:flex-row gap-10 xl:gap-0 xl:justify-between xl:items-end bg-background mx-auto  w-78 md:w-91 xl:w-[1188px]">
        <img
          className="block xl:order-1 w-78 h-[210px] md:w-91 md:h-60 xl:w-186 xl:h-97 object-cover object-bottom rounded-2xl shadow-lg"
          src={landingPic}
          alt="사용 설명 이미지"
        />
        <div className={cn('w-103', textFirst ? 'xl:order-0' : 'xl:order-1')}>
          <h3
            className={cn(
              'text-black-950  text-xl xl:text-3xl font-bold  leading-8 xl:leading-12 mb-4 md:mb-5 xl:mb-10 whitespace-pre-line',
              textFirst ? 'text-right' : 'text-left',
            )}
          >
            {title}
          </h3>
          <p
            className={cn(
              'text-blue-500 whitespace-pre-line',
              textFirst ? 'text-right' : 'text-left',
            )}
          >
            {paragraph}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingSection;
