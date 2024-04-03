import { arbuzApp, clixGame, doxCoin, limeCoin, notCoin, tapSwap, thePixels } from '../coins';
import { goToAppFromTelegram } from '../telegram';

export const appsHostMap: Record<string, [() => any, string]> = {
  'web.telegram.org': [goToAppFromTelegram, ''],
  'webapp.limecoin.online': [limeCoin, 'https://web.telegram.org/k/#@OfficialLimeCoinBot'],
  'doxcoin.net': [doxCoin, 'https://web.telegram.org/k/#@DOXcoin_BOT'],
  'clicker.joincommunity.xyz': [notCoin, 'https://web.telegram.org/k/#@notcoin_bot'],
  'clix.game': [clixGame, 'https://clix.game/'],
  'app.tapswap.ai': [tapSwap, 'https://web.telegram.org/k/#@tapswap_bot'],
  'the-pixels-game.fireheadz.games': [thePixels, 'https://web.telegram.org/k/#@the_pixels_bot'],
  'the-pixels.pages.dev': [thePixels, 'https://web.telegram.org/k/#@the_pixels_bot'],
  'arbuzapp.betty.games': [arbuzApp, 'https://web.telegram.org/k/#@wmclick_bot_arbuz'],
};