import { goTypicalBot } from '../utils/typicalBot';

const selectors = {
  coinClick: '.game__field',
  counts: '.energy__value.current-value',
};

export const arbuzApp = () => {
  goTypicalBot(selectors);
};
