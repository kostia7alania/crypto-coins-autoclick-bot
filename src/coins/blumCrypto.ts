import { goTypicalBot } from '../utils/typicalBot';

const selectors = {
  coinClick: '.kit-button',
  counts: '',
};

export const blumCrypto = () => {
  goTypicalBot(selectors);
  window.maxWait = 1000 * 10;
};
