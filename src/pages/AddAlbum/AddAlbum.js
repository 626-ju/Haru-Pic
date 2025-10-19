import FileInput from './FileInput.js';
import { postAlbum } from '../../api/postAlbum.js';
import Background from '../../assets/main_bg.png';
import Button from '../../components/Button.js';
import Divider from '../../components/Divider.js';
import { router } from '../../components/Router/Router.js';

function AddAlbum() {
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = await postAlbum(formData);

    if (data.id) {
      router.push(`/album/${data.id}`);
    }
  }

  return (
    <div className="bg-background">
      <div
        className="min-h-160 bg-cover bg-center"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <form
          onSubmit={handleSubmit}
          className="pt-10 md:pt-30 flex gap-5 pb-20 mx-auto flex-col items-center md:items-start  md:flex-row min-w-90 md:w-180 xl:w-280"
        >
          <FileInput />

          <div className="flex flex-col w-90 md:w-120 mt-5 gap-10">
            <label className="block text-xl md:text-2xl">
              사진 제목
              <input
                name="title"
                required
                placeholder="제목을 입력해주세요"
                className="block text-md mt-2 w-full md:text-xl border border-gray-300 rounded-lg py-2 px-6"
                maxLength={20}
              />
            </label>

            <label className="block text-xl  md:text-2xl  ">
              내용
              <textarea
                name="description"
                className="block text-md mt-2 w-full md:text-xl border border-gray-300 rounded-lg py-2 px-6 h-40 md:h-34 xl:h-54"
                maxLength={300}
                placeholder="내용을 입력해주세요"
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
    </div>
  );
}

export default AddAlbum;
