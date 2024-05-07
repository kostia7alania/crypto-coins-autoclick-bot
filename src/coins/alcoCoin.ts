import { goTypicalBot } from '../utils/typicalBot';

const selectors = {
  coinClick: '#home-page > div.coin-btn.loaded.square',
  counts: '#home-page > div.coin-counter',
};

export const alcoCoin = () => {
  goTypicalBot(selectors);
};
