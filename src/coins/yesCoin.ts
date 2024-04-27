import { goTypicalBot } from '../utils/typicalBot';

const selectors = {
  coinClick: 'img[alt="Clicker Coin"]',
  counts: 'app-player-energy .typo-number > span',
};

export const yesCoin = () => {
  goTypicalBot(selectors);
};
