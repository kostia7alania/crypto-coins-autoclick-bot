import { getRandom } from '../utils/getRandom';
import { getWait } from './getWait';
import { simulateMouseClick } from './simulateMouseClick';
import { simulateTouch } from './simulateTouch';

type Selectors = {
  coinClick: string;
  counts: string;
  boosted?: string;
  okText?: string;
  boosters?: {
    // 'guru' | 'full';
    [key: string]: {
      // 'section' | 'item' | 'confirm' | "fallback"
      [key: string]: {
        selector: string;
        text: string;
      };
    };
  };
};

let isInProgress = false;
let count = 0;

declare global {
  interface Window {
    maxWait: number;
  }
}

const clickByText = (selector: string, text: string, isExact = false) => {
  const find = [...document.querySelectorAll(selector)].find((el) =>
    isExact ? el.textContent === text : el.textContent?.includes(text),
  );
  if (!find || (find as HTMLElement).hasAttribute('disabled')) return false;

  simulateMouseClick(find as HTMLElement);
  simulateTouch(find as HTMLElement);

  return true;
};

export const goTypicalBot = (selectors: Selectors) => {
  window.maxWait = 400;

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
    if (!selectors.okText) return;

    [...document.querySelectorAll('button')].forEach((e) => {
      if (e.textContent === selectors.okText) {
        simulateMouseClick(e as HTMLElement);
        simulateTouch(e as HTMLElement);
      }
    });
  };

  const getCounts = () => {
    if (!selectors.counts) return Infinity;

    const counts = document.querySelector(selectors.counts)?.textContent;
    if (!counts) return 0;
    return Number.parseInt(counts.replace(',', ''));
  };

  const getIsBoosted = () => {
    return selectors.boosted && document.querySelector(selectors.boosted);
  };

  /**
   *  click boosters
   */

  let isBoostInProgress = false;
  const temporaryBlockedBoostSections: Record<string, boolean> = {
    //
  };

  const applyBoost = async (section: string) => {
    if (isBoostInProgress || temporaryBlockedBoostSections[section]) return;

    const boosterItem = selectors?.boosters?.[section];

    if (!boosterItem) return;

    try {
      isBoostInProgress = true;

      clickByText(boosterItem?.section.selector, boosterItem.section.text);

      await getWait(3_000);

      if (!clickByText(boosterItem.item.selector, boosterItem.item.text)) {
        temporaryBlockedBoostSections[section] = true;
        setTimeout(() => (temporaryBlockedBoostSections[section] = false), 100_000);
      }
      await getWait(3_000);
      clickByText(boosterItem.confirm.selector, boosterItem.confirm.text);
      await getWait(3_000);
    } finally {
      isBoostInProgress = false;
      await clickByText(boosterItem.fallback.selector, boosterItem.fallback.text, true);
    }
  };

  /**
   *  start
   */

  const start = async () => {
    if (isInProgress) return;
    clickTabBotOkButton();

    let counts = 0;

    while ((counts = getCounts()) > 10) {
      isInProgress = true;
      if (clickCoin()) {
        // @ts-ignore
        if (!window.silent) console.log(`click #${++count} :: ${counts}`);
      } else {
        console.log('fail click ');
      }
      await (getIsBoosted() ? getWait(getRandom(1, 7)) : getWait(getRandom(25, window.maxWait)));
      isInProgress = false;
    }

    if (selectors?.boosters) {
      Object.keys(selectors?.boosters).forEach(applyBoost);
    }
  };

  setInterval(start, 3000);
};
