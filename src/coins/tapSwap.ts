import { goTypicalBot } from '../utils/typicalBot';

const selectors = {
  coinClick: '[class^="_tapContent"] img',
  counts: '[class^="_value_"] h4',
  boosted: '[class^="_tapContainer"]:not(.undefined)', // _boostCoinBg_
  okText: 'Get it!',

  boosters: {
    guru: {
      section: { selector: 'button', text: 'Boost' },
      item: { selector: 'button', text: 'Taping Guru' },
      confirm: { selector: 'button', text: 'Get it!' },
      fallback: { selector: 'button', text: 'Tap' },
    },
    full: {
      section: { selector: 'button', text: 'Boost' },
      item: { selector: 'button', text: 'Full Tank' },
      confirm: { selector: 'button', text: 'Get it!' },
      fallback: { selector: 'button', text: 'Tap' },
    },
  },
};

export const tapSwap = () => {
  goTypicalBot(selectors);
};
