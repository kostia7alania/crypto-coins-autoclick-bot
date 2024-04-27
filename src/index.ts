import { appsHostMap } from './hostMap';

// import { initVueApp } from './ui/main';

const __main_def__ = async () => {
  const [callback] = appsHostMap[location.host];

  if (typeof callback === 'function') {
    // initVueApp();
    callback();
    return;
  }
  console.log('nothing found');
};

__main_def__();
