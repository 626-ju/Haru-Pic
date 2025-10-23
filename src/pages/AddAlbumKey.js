import Button from '../components/Button.js';
import { router } from '../components/Router/Router.js';
import { useState } from '../hooks/useState.js';
import { cn } from '../lib/utils.js';

function AddAlbumKey() {
  const [albumKey, setAlbumKey] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem('ALBUM_KEY', albumKey);
    router.push('/');
  }

  return (
    <div
      className={cn(
        'fixed inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center z-50',
      )}
    >
      <div className="bg-white p-8 rounded-2xl border-1 border-gray-300">
        <form onSubmit={handleSubmit} className="flex flex-col justify-start">
          <h2 className="text-xl text-black-500 font-bold">
            앨범 고유 아이디를 등록해주세요
          </h2>
          <input
            onChange={(e) => setAlbumKey(e.target.value)}
            className="mt-8 min-w-90 md:w-100 border-gray-300 border-1 rounded-xl px-6 py-4"
            placeholder="식별할 앨범 아이디를 입력해주세요"
            maxLength={20}
            required
            type="text"
          />
          <Button variant="submit" className="mt-6">
            등록
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddAlbumKey;
