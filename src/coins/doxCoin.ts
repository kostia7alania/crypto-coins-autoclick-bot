import { goTypicalBot } from '../utils/typicalBot';

const selectors = {
  coinClick: '.coin-btn',
  counts: 'span.text-3xl.font-bold',
};

export const doxCoin = () => {
  goTypicalBot(selectors);
};
