import { goTypicalBot } from '../utils/typicalBot';

const selectors = {
  coinClick: '.ClickerCoinDot',
  counts: '',
};

export const dotCoin = () => {
  goTypicalBot(selectors);
};
