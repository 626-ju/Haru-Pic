import { cn } from '../../lib/utils.js';

import Link from '../../components/Router/Link.js';

const PolaroidFrame = ({ id, title, className }) => {
  const imgName = title || '';
  const albumId = id || 123;

  return (
    <Link to={`/album/${albumId}`}>
      <div
        className={cn(
          'bg-white w-42 h-56 md:w-60 md:h-80 mx-auto p-3 md:p-5 pb-0 md:pb-0 shadow-sm flex-shrink-0',
          className,
        )}
      >
        {/* 추후 이미지로 교체 */}
        <div className="bg-amber-400 h-[80%] w-full" />
        <span className="mt-2 md:mt-4 line-clamp-1 w-full !break-all font-family-Iropke text-black-500 text-center xl:mt-6 xl:text-lg">
          {imgName}
        </span>
      </div>
    </Link>
  );
};

export default PolaroidFrame;
