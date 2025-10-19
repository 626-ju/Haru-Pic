import { cn } from '../lib/utils.js';

function LoadingSpinner({ loading }) {
  return (
    <div
      className={cn(
        'fixed inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center z-50',
        !loading && 'hidden',
      )}
    >
      <div className="bg-white p-8 rounded-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-center">Loading...</p>
      </div>
    </div>
  );
}

export default LoadingSpinner;
