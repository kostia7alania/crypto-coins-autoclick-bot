import { appsHostMap } from '@/hostMap';

const __main_def__ = async () => {
  const [callback] = appsHostMap[location.host];

  if (typeof callback === 'function') return callback();
  console.log('nothing found');
};

__main_def__();

document.querySelector('body')?.insertAdjacentHTML(
  'beforebegin',
  `
  <div>
    <h1>sex</h1>
  </div>
`,
);
