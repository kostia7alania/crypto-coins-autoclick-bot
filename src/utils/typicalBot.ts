import { getRandom } from '../utils/getRandom';
import { getWait } from './getWait';
import { simulateMouseClick } from './simulateMouseClick';
import { simulateTouch } from './simulateTouch';

type Selectors = {
  coinClick: string;
  counts: string;
  boosted?: string;
  tabBotOkText?: string;
};

let isInProgress = false;
let count = 0;

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

  const clickTabBotOkButton = () => {
    if (!selectors.tabBotOkText) return;

    [...document.querySelectorAll('button')].forEach((e) => {
      if (e.textContent === selectors.tabBotOkText) {
        simulateMouseClick(e as HTMLElement);
        simulateTouch(e as HTMLElement);
      }
    });
  };

  const getCounts = () => {
    const counts = document.querySelector(selectors.counts)?.textContent;
    if (!counts) return 0;
    return +counts;
  };

  const getIsBoosted = () => {
    return selectors.boosted && document.querySelector(selectors.boosted);
  };

  const start = async () => {
    if (isInProgress) return;
    clickTabBotOkButton();

    let counts = 0;
    while ((counts = getCounts())) {
      isInProgress = true;
      if (clickCoin()) {
        // @ts-ignore
        if (!window.silent) console.log(`click #${++count} :: ${counts}`);
      } else {
        console.log('fail click ');
      }
      await (getIsBoosted() ? getWait(getRandom(1, 7)) : getWait(getRandom(25, 400)));
      isInProgress = false;
    }
  };

  setInterval(start, 3000);
};
