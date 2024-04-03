/*
// @match        https://${url}/*
*/
import os from 'node:os';

import { appsHostMap } from './appsHostMap';

const urls = Object.entries(appsHostMap);

export const getMatchesFromMap = () => {
  return urls
    .filter(([_, [, tg]]) => tg)
    .reduce((acc, [url, [, tg]]) => {
      return acc + `${os.EOL}// @match        https://${url}/*${os.EOL}// @match        ${tg}${os.EOL}`;
    }, '');
};
