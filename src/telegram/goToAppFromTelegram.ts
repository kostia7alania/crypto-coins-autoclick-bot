import { getWait } from '../utils/getWait';
import { simulateMouseClick } from '../utils/simulateMouseClick';
import { simulateTouch } from '../utils/simulateTouch';

const buttonTexts = [
  'Начать игру', // @OfficialLimeCoinBot
  'Play', // @DOXcoin_BOT & @notcoin_bot & @tapswap_bot
  'Let’s go', // @notcoin_bot
  'Start now!', // @tapswap_bot
  'Играть', // @mellcoinsbot
  'Launch Blum', // @BlumCryptoBot
];

const preventGoFullscreen = ['https://web.telegram.org/k/#@BlumCryptoBot', 'https://web.telegram.org/k/#@YesCoin_ebot'];

export const goToAppFromTelegram = () => {
  /**************
   * COMMON CODE
   **************/
  const clickPlay = () => {
    [...document.querySelectorAll('button')].find((e) => {
      const content = e.textContent;
      const hasText = buttonTexts.some((text) => content?.includes(text));

      if (hasText) {
        simulateMouseClick(e);
        simulateTouch(e);

        return true;
      }
    });
  };

  const getIframe = () => document.querySelector('iframe');

  const clickLaunchIfIsset = () => {
    const launch = [...document.querySelectorAll('.popup-button')].find((e) => e.textContent === 'Launch');
    if (launch) {
      (launch as HTMLElement).click();
    }
  };

  const start = async (): Promise<any> => {
    if (getIframe()) return;

    clickPlay();

    await getWait(2000);

    clickLaunchIfIsset();

    await getWait(2000);
    const iframe = getIframe();

    if (!iframe) {
      console.info('%c хуйня какая-то, начинай по новой', 'color: #64b5f6');

      return start();
    }

    if (!preventGoFullscreen.includes(location.href)) {
      location.href = iframe.src
        .replace('tgWebAppPlatform=weba', 'tgWebAppPlatform=ios')
        .replace('tgWebAppPlatform=web', 'tgWebAppPlatform=ios');
    }
  };

  start();
};
