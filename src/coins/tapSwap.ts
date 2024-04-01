import { goTypicalBot } from '../utils/typicalBot';

const selectors = {
  coinClick: '[class^="_tapContent"] img',
  counts: '[class^="_value_"] h4',
  boosted: '[class^="_large"]',
  tapBotOkText: 'Get it!',
};

export const tapSwap = () => {
  goTypicalBot(selectors);
};
