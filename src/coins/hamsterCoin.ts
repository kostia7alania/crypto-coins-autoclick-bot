import { goTypicalBot } from '../utils/typicalBot';

const selectors = {
  coinClick: '.user-tap-button',
  counts: '.user-tap-energy',

  boosters: {
    full: {
      section: { selector: '.user-tap-boost', text: 'Boost' },
      item: { selector: '.boost-item:not(.is-not-available)', text: 'Full energy' },
      confirm: { selector: '.bottom-sheet-button', text: '' },
      fallback: { selector: 'button', text: 'Tap' },
    },
  },
};

export const hamsterCoin = () => {
  goTypicalBot(selectors);
};
