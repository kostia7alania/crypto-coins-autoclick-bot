import { goTypicalBot } from '../utils/typicalBot';

const selectors = {
  coinClick: '.coin-image',
  counts: '',
};

export const mellCoin = () => {
  goTypicalBot(selectors);
};
