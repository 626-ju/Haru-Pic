import clsx from 'clsx';
import kebabIcon from '../assets/kebab.svg';
import { useKebabOutside } from '../hooks/useKebabOutside.js';
import { useState } from '../hooks/useState.js';
import { useKebabStore } from '../store/kebabStore.js';
import { addCleanup } from './Router/Router.js';

function Kebab({ id }) {
  useKebabStore.getState().close(id); //스토어에 id 추가

  return (
    <div data-kebab id={`kebab-${id}`} className="relative">
      <Trigger id={id} />
      <Dropdown id={id} />
    </div>
  );
}

export default Kebab;

function Trigger({ id }) {
  const allClose = useKebabStore.getState().allClose;
  const open = useKebabStore.getState().open;
  const close = useKebabStore.getState().close;

  const handleToggle = () => {
    const isOpen = useKebabStore.getState().store[id].isOpen;

    if (isOpen) {
      close(id);
    } else {
      allClose();
      open(id);
    }
  };

  return (
    <button
      className="cursor-pointer w-7 h-7 opacity-30 hover:opacity-100 transition-opacity duration-100"
      onClick={handleToggle}
    >
      <img src={kebabIcon} alt="케밥 아이콘" />
    </button>
  );
}

const subscribed = {};

function Dropdown({ id }) {
  const [isOpen, setIsOpen] = useState(
    useKebabStore.getState().store[id]?.isOpen,
  );

  const close = useKebabStore.getState().close;

  useKebabOutside();

  // 스토어 변화 감지
  if (!subscribed[id]) {
    subscribed[id] = true;
    //주스탄드의 subscribe는 unsubscribe를 함수를 반환
    const unSubscribe = useKebabStore.subscribe((state) => {
      setIsOpen(state.store[id].isOpen);
    });

    addCleanup(() => {
      unSubscribe();
      delete subscribed[id];
    });
  }

  return (
    <ul
      className={clsx(
        isOpen ? 'block' : 'hidden',
        'border-1 border-gray-300 rounded-xl bg-white absolute right-0 cursor-pointer text-gray-300',
      )}
    >
      {DROPDOWN_MENU.map((item) => {
        return (
          <li
            className="px-5 py-2 last:border-gray-300 last:border-t hover:text-black-300 transition-text duration-100"
            key={item.content}
            onClick={() => {
              item.action();
              close(id);
            }}
          >
            {item.content}
          </li>
        );
      })}
    </ul>
  );
}

const UPDATE = {
  content: '수정하기',
  action: () => console.log('수정하기'),
};

const DELETE = {
  content: '삭제하기',
  action: () => console.log('삭제하기'),
};

const DROPDOWN_MENU = [UPDATE, DELETE];
