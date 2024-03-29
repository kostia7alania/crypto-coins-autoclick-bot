import { getRandom } from '../utils/getRandom';

type Selectors = {
  coinClick: string;
  counts: string;
};

export const goTypicalBot = (selectors: Selectors) => {
  /**************
   * COMMON CODE
   **************/

  const wait = (ms = getRandom(25, 400)) => new Promise((res) => setTimeout(res, ms));

  const clickCoin = () => {
    (document.querySelector(selectors.coinClick) as HTMLElement).click();
  };

  const getCounts = () => {
    const counts = document.querySelector(selectors.counts)?.textContent;
    console.log(`counts: ${counts}`);
    if (!counts) return 0;
    return +counts;
  };

  let isInProgress = false;
  let count = 0;

  const start = async () => {
    if (isInProgress) return;

    while (getCounts()) {
      isInProgress = true;
      clickCoin();
      console.log(`click #${++count}`);
      await wait();
      isInProgress = false;
    }
  };

  setInterval(start, 3000);
};
