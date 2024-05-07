import { getRandom } from '../utils/getRandom';
import { getWait } from '../utils/getWait';
import { simulateMouseClick } from '../utils/simulateMouseClick';
import { simulateTouch } from '../utils/simulateTouch';

let isInProgress = false;
let count = 0;

export const thePixels = () => {
  const anyClick = () => {
    const found = [...document.querySelectorAll('[class^="BlackButtonStyled"]:not(:disabled)')].find((e) => {
      return ['Push', 'Grab', 'Next Pixel','Закрасить','Pixel'].find((text) => e.textContent?.includes(text));
    }) as HTMLElement | undefined;

    if (!found) return false;
    simulateMouseClick(found);
    simulateTouch(found);
    return true;
  };

  const getCounts = () => {
    const counts = document.querySelector('[class^=TargetProgressInfo]')?.textContent?.split('/').at(0);
    if (!counts) return 0;
    return +counts;
  };

  const start = async () => {
    if (isInProgress) return;

    let counts = 0;

    while ((counts = getCounts())) {
      isInProgress = true;
      if (anyClick()) {
        // @ts-ignore
        if (!window.silent) console.log(`click #${++count} :: ${counts}`);
      } else {
        console.log('fail click ');
      }
      await getWait(getRandom(333, 1000));
      isInProgress = false;
    }
  };

  setInterval(start, 3000);
};
