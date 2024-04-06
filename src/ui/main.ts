import { createApp } from 'vue';

import App from './App.vue';

export const initVueApp = () => {
  const APP_ID = 'crypto-bot';

  document.querySelector('body')?.insertAdjacentHTML(
    'beforebegin',
    `
    <div id="${APP_ID}">
      <h1>sex</h1>
    </div>
  `,
  );

  const app = createApp(App);

  app.mount(`#${APP_ID}`);
};
