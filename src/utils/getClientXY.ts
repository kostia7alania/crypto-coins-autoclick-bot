import { getRandom } from './getRandom';

export const getClientXY = (targetNode: HTMLElement) => {
  const box = targetNode.getBoundingClientRect();
  const clientX = box.left + (box.right - box.left) / 2 + getRandom(-100, 100);
  const clientY = box.top + (box.bottom - box.top) / 2 + getRandom(-100, 100);

  return {
    clientX,
    clientY,
  };
};
