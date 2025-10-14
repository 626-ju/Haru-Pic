import PolaroidFrame from './PolaroidFrame.js';

const Albums = () => {
  const res = Array(5).fill(0);
  return (
    <div className=" pt-50 md:pt-51 xl:pt-80 bg-background h-[100vh]">
      <div className="grid grid-cols-4 gap-y-10 mx-auto w-280 ">
        {res.map(() => {
          return <PolaroidFrame />;
        })}
      </div>
    </div>
  );
};

export default Albums;
