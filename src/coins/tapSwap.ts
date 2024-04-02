import { goTypicalBot } from '../utils/typicalBot';

const selectors = {
  coinClick: '[class^="_tapContent"] img',
  counts: '[class^="_value_"] h4',
  boosted: '[class^="_tapContainer"]:not(.undefined)', // _boostCoinBg_
  tapBotOkText: 'Get it!',
};

export const tapSwap = () => {
  goTypicalBot(selectors);
};
