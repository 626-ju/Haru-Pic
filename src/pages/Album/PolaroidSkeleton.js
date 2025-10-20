import { cn } from '../../lib/utils.js';

function PolaroidSkeleton({ className }) {
  return (
    <div
      className={cn(
        'bg-white w-42 h-56 md:w-60 md:h-80 p-3 md:p-5 pb-0 md:pb-0 shadow-sm flex-shrink-0',
        className,
      )}
    >
      <div className="bg-gray-300 h-[80%] w-full relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
      </div>

      <div className="h-4 xl:h-5 bg-gray-300 rounded w-3/4 relative overflow-hidden mt-2 md:mt-4">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
      </div>
    </div>
  );
}

export default PolaroidSkeleton;
