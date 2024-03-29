import { getRandom } from '../utils/getRandom';
import { goTypicalBot } from '../utils/typicalBot';

const selectors = {
  coinClick: '.click-coin img',
  counts: '.click-limit__left',
};

declare const window: {
  AuthorizationHeaderLimeCoin: string | null;
  go: () => void;
};

// const getCoinButton = () => document.querySelector('.click-coin img');
// const limit = ( => document.querySelector('.click-limit__left')

export const limeCoin = () => {
  goTypicalBot(selectors);

  /**
   * Direct API way:
   */

  // const AuthorizationHeaderLimeCoin =
  // "Bearer query_id=AAFB8lUJAwAAAEHyVQljrZtc&user=%7B%22id%22%3A6599078465%2C%22first_name%22%3A%22Const%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22kostia7aiania%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1711656714&hash=764cc5dac670a92a548fdc212d4c66f74ca4f248b1b87986a934ffcbc9653633";

  // rocket activation - POST https://api.limecoin.online/points/boost/activate/
  const url = 'https://api.limecoin.online/points/receive/';

  const getParameters = (isBoost?: boolean) => {
    const clicks = getRandom(1, 100);
    const divider = isBoost ? 1000 : 10_000;

    return { clicks: clicks, points: clicks / divider };
  };

  const sendRequest = (newParameters = {}) => {
    return new Promise((res) => {
      const http = new XMLHttpRequest();
      http.open('POST', url);
      http.setRequestHeader('Content-type', 'application/json');
      http.setRequestHeader('Authorization', window.AuthorizationHeaderLimeCoin ?? '');
      http.send(JSON.stringify(newParameters)); // Make sure to stringify
      http.addEventListener('load', function () {
        // Do whatever with response
        res(true);
      });
    });
  };

  const go = async (isBoost?: boolean) => {
    if (!window.AuthorizationHeaderLimeCoin) {
      window.AuthorizationHeaderLimeCoin = prompt('Пожалуйста, скопируйте Authorization-хедер в запросах limeCoin');

      if (!window.AuthorizationHeaderLimeCoin) {
        alert('не получилось? Если захочешь запустить скрипт - просто обнови страницу');
        return;
      }
    }

    let count = 0;
    while (await sendRequest(getParameters(isBoost))) {
      console.log(`[${isBoost ? 'boost' : 'regular'}] request sent: ${++count}`);
    }
  };

  window.go = go;
  console.log('limeCoin: если хочешь прямые апи-запросы - запускай в консоле: go() - без буста, go(true) - с бустом');
  // go(true); // with booster
  // go(false); // without booster
};
