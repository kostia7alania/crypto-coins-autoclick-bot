import { goTypicalBot } from '../utils/typicalBot';

const selectors = {
  coinClick: 'button [src="/clicker/mainButton/basic/button.png"]',
  counts: '.text-xl.text-white.font-medium',
};

export const clixGame = () => {
  goTypicalBot(selectors);
};
