import ColorPalette from './ColorPalette.js';
import FileInput from './FileInput.js';
import { postAlbum } from '../../api/postAlbum.js';
import Background from '../../assets/main_bg.png';
import Button from '../../components/Button.js';
import Divider from '../../components/Divider.js';
import LoadingSpinner from '../../components/LoadingSpinner.js';
import { router } from '../../components/Router/Router.js';
import { useState } from '../../hooks/useState.js';

function AddAlbum() {
  const [frameColor, setFramecolor] = useState('white');
  const [isLoading, setIsLoading] = useState(false);

  function handleClick(e) {
    setFramecolor(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData(e.target);
      await postAlbum(formData);
      router.push('/albums');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-background">
      <LoadingSpinner loading={isLoading} />
      <div
        className="min-h-160 bg-cover bg-center"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <form
          id="albumForm"
          onSubmit={handleSubmit}
          className="pt-10 md:pt-30 flex gap-5 pb-20 mx-auto flex-col items-center md:items-start  md:flex-row min-w-90 md:w-180 xl:w-280"
        >
          <FileInput frameColor={frameColor} />

          <div className="flex flex-col w-90 md:w-120 mt-5 gap-10">
            <label className="block text-xl md:text-2xl">
              사진 제목
              <input
                name="title"
                required
                placeholder="제목을 입력해주세요"
                className="block text-md mt-2 w-full md:text-xl border border-gray-300 rounded-lg py-2 px-6"
                maxLength={20}
                minLength={2}
              />
            </label>

            <label className="block text-xl  md:text-2xl  ">
              내용
              <textarea
                name="description"
                className="block text-md mt-2 w-full md:text-xl border border-gray-300 rounded-lg py-2 px-6 h-40 md:h-34 xl:h-54"
                maxLength={300}
                minLength={6}
                placeholder="내용을 입력해주세요"
                required
              />
            </label>

            <Button
              variant="submit"
              type="submit"
              className="-mt-3 w-full md:w-fit md:ml-auto"
            >
              등록
            </Button>
          </div>
        </form>
      </div>
      <Divider />
      <ColorPalette form={'albumForm'} onClick={handleClick} />
    </div>
  );
}

export default AddAlbum;
