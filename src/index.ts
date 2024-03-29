import { clixGame, doxCoin, limeCoin, notCoin } from './coins';
import { goToAppFromTelegram } from './telegram';

const hostMap: Record<string, () => any> = {
  'web.telegram.org': goToAppFromTelegram,
  'webapp.limecoin.online': limeCoin,
  'https://doxcoin.net/game': doxCoin,
  'clicker.joincommunity.xyz': notCoin,
  'clix.game': clixGame,
};

const __main_def__ = async () => {
  const callback = hostMap[location.host];

  if (typeof callback === 'function') return callback();
  console.log('nothing found');
};

__main_def__();
