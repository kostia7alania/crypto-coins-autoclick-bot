import { getRandom } from './getRandom';

export const getWait = (ms = getRandom(60, 123)) => new Promise((res) => setTimeout(res, ms));
