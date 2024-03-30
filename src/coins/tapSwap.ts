import { goTypicalBot } from '../utils/typicalBot';

const selectors = {
  coinClick: '[class^="_tapContent"] img',
  counts: '[class^="_value_"] h4',
  boosted: '[class^="_boostCoinBg_"]',
};

export const tapSwap = () => {
  goTypicalBot(selectors);
};
