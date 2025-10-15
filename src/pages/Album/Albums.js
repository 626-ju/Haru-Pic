import PolaroidFrame from './PolaroidFrame.js';

const Albums = () => {
  const res = Array(5).fill(0);
  return (
    <div className="min-w-[375px] pt-40 bg-background">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-10 mx-auto w-90 md:w-200 xl:w-280">
        {res.map(() => {
          return <PolaroidFrame title={'임시 제목입니다.11111111111111111'} />;
        })}
      </div>
    </div>
  );
};

export default Albums;
