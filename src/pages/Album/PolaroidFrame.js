import clsx from 'clsx';

import Link from '../../components/Router/Link.js';

const PolaroidFrame = ({ id, title, className }) => {
  const imgName = title || '임시 제목입니다.11111111111111111';
  const albumId = id || 123;

  return (
    <Link to={`/album/${albumId}`}>
      <div
        className={clsx('bg-white w-60 h-80 mx-auto p-5 shadow-sm', className)}
      >
        {/* 추후 이미지로 교체 */}
        <div className="bg-amber-400 w-50 h-60" />
        <span className="mt-4 line-clamp-1 w-50 !break-all font-family-Iropke text-black-500">
          {imgName}
        </span>
      </div>
    </Link>
  );
};

export default PolaroidFrame;
