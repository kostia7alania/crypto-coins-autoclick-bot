import { clixGame, doxCoin, limeCoin, notCoin, tapSwap, thePixels } from './coins';
import { goToAppFromTelegram } from './telegram';

const hostMap: Record<string, () => any> = {
  'web.telegram.org': goToAppFromTelegram,
  'webapp.limecoin.online': limeCoin,
  'doxcoin.net': doxCoin,
  'clicker.joincommunity.xyz': notCoin,
  'clix.game': clixGame,
  'app.tapswap.ai': tapSwap,
  'the-pixels-game.fireheadz.games': thePixels,
};

const __main_def__ = async () => {
  const callback = hostMap[location.host];

  if (typeof callback === 'function') return callback();
  console.log('nothing found');
};

__main_def__();
