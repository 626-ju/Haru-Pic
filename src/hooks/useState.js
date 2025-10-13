import { rerender, SeongJoo } from '../index.js';

export function useState(initialValue) {
  const fiber = SeongJoo.currentFiber;

  if (!fiber.hookIndex) fiber.hookIndex = 0;

  const index = fiber.hookIndex++;
  const hooks = fiber.hooks;

  if (!hooks[index]) hooks[index] = { state: initialValue };

  function setState(value) {
    hooks[index].state =
      typeof value === 'function' ? value(hooks[index].state) : value;

    //리렌더 추가
    rerender(fiber);
  }

  return [hooks[index].state, setState];
}
