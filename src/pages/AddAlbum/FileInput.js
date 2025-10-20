import { COLOR_PALETTE } from './ColorPalette.js';
import { uploadImage } from '../../api/uploadImage.js';
import { useState } from '../../hooks/useState.js';
import { cn } from '../../lib/utils.js';

function FileInput({ frameColor }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  async function handleChange(e) {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const newFile = translateFile(file);

    setIsUploading(true);
    const uploadedUrl = await uploadImage(newFile);
    setIsUploading(false);

    if (uploadedUrl) {
      setImageUrl(uploadedUrl);
    }
  }

  function onRemove() {
    setImageUrl(null);
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.value = '';
    }
  }

  return (
    <div
      className={cn(
        'bg-white w-90 h-75 md:w-96 md:h-80 xl:w-120 xl:h-100 shadow-xl p-5  mx-auto pb-0 md:pb-0 flex-shrink-0',
        COLOR_PALETTE[frameColor],
      )}
    >
      <input
        type="file"
        id="fileInput"
        className="sr-only"
        accept=".png,.jpg,.jpeg"
        onChange={handleChange}
        disabled={isUploading}
      />

      <div className={cn(!imageUrl && 'hidden')}>
        <Preview imageUrl={imageUrl} onRemove={onRemove} />
        <input type="hidden" name="imageUrl" value={imageUrl || ''} />
      </div>

      <label
        htmlFor="fileInput"
        className={cn(
          'block bg-gray-300 h-[80%] w-full cursor-pointer flex justify-center items-center text-[60px] text-black-300 hover:text-white',
          imageUrl && 'hidden',
        )}
      >
        +
      </label>
    </div>
  );
}

export default FileInput;

function Preview({ imageUrl, onRemove }) {
  return (
    <div className="relative h-[80%]">
      <img src={imageUrl} className="block w-full h-full" />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onRemove();
        }}
        className="absolute rounded-full top-2 right-2 bg-gray-300 text-black-300 z-10 opacity-30
         flex justify-center items-center w-8 h-8 hover:text-white cursor-pointer  hover:opacity-70"
      >
        ×
      </button>
    </div>
  );
}

function translateFile(file) {
  const extension = file.name.split('.').pop();
  const randomName =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15) +
    Date.now();

  const newFileName = `${randomName}.${extension}`;

  return new File([file], newFileName, { type: file.type });
}
