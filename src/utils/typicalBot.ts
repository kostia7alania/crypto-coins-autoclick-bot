import { getRandom } from '../utils/getRandom';
import { getWait } from './getWait';
import { simulateMouseClick } from './simulateMouseClick';
import { simulateTouch } from './simulateTouch';

type Selectors = {
  coinClick: string;
  counts: string;
  boosted?: string;
};

export const goTypicalBot = (selectors: Selectors) => {
  /**************
   * COMMON CODE
   **************/

  const clickCoin = () => {
    const coinButton = document.querySelector(selectors.coinClick);
    if (coinButton) {
      simulateMouseClick(coinButton as HTMLElement);
      simulateTouch(coinButton as HTMLElement);
      return true;
    }
  };

  const getCounts = () => {
    const counts = document.querySelector(selectors.counts)?.textContent;
    console.log(`counts: ${counts}`);
    if (!counts) return 0;
    return +counts;
  };

  const getIsBoosted = () => {
    return selectors.boosted && document.querySelector(selectors.boosted);
  };
  let isInProgress = false;
  let count = 0;

  const start = async () => {
    if (isInProgress) return;

    while (getCounts()) {
      isInProgress = true;
      if (clickCoin()) console.log(`click #${++count}`);
      else console.log('fail click ');
      await (getIsBoosted() ? getWait(getRandom(1, 7)) : getWait(getRandom(25, 400)));
      isInProgress = false;
    }
  };

  setInterval(start, 3000);
};
