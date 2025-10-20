import { cn } from '../../lib/utils.js';

export const COLOR_PALETTE = {
  white: 'bg-white',
  red: 'bg-red-500',
  yellow: 'bg-yellow-500',
  amber: 'bg-amber-500',
  violet: 'bg-violet-500',
  pink: 'bg-pink-500',
  black: 'bg-black',
  blue: 'bg-blue-500',
};

function ColorPalette({ form, onClick }) {
  return (
    <div className="grid grid-cols-4 gap-5 min-w-90 md:w-180 xl:w-280 mx-auto pt-10 pb-20">
      {Object.keys(COLOR_PALETTE).map((color) => {
        return (
          <label
            onClick={onClick}
            className={cn(
              'block w-24 h-24 rounded-full cursor-pointer border border-gray-300 opacity-30',
              COLOR_PALETTE[color],
              'has-[:checked]:opacity-100  has-[:checked]:border-black has-[:checked]:border-',
            )}
            key={color}
          >
            <input
              type="radio"
              className="sr-only"
              name="color"
              value={color}
              form={form}
            />
          </label>
        );
      })}
    </div>
  );
}

export default ColorPalette;
