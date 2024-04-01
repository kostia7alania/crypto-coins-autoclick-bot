// ==UserScript==
// @name         Crypto Coins Auto-Click Bot
// @namespace    Violentmonkey Scripts
// @match        https://clicker.joincommunity.xyz/clicker*
// @match        https://clix.game/*
// @match        https://doxcoin.net/game*
// @match        https://app.tapswap.ai/*

// @match       https://web.telegram.org/k/#@OfficialLimeCoinBot
// @match       https://web.telegram.org/k/#@DOXcoin_BOT
// @match       https://web.telegram.org/k/#@notcoin_bot
// @match       https://web.telegram.org/k/#@tapswap_bot

// @match       https://webapp.limecoin.online/*

// @version      1.0.12
// @author       t.me/dvachers_space
// @description  first release: 29.03.2024, 13:33:33, last release: 02.04.2024, 01:41:15
// @downloadURL  https://github.com/kostia7alania/crypto-coins-autoclick-bot/raw/main/dist/index.user.js
// @updateURL    https://github.com/kostia7alania/crypto-coins-autoclick-bot/raw/main/dist/index.user.js
// @homepage     https://github.com/kostia7alania/crypto-coins-autoclick-bot
// @icon         https://cdn.joincommunity.xyz/clicker/moneta-small.png
// ==/UserScript==

const notCoin = () => {
  const minimumEnergyForClick = 900;
  const min_click_count = 30;
  const max_click_count = 100;
  const clickInterval = 500;
  async function clickCoin() {
    try {
      const coinElement = document.querySelector('div[class^="_notcoin"]');
      if (coinElement) {
        await new Promise((resolve) => {
          coinElement[Object.keys(coinElement)[1]].onTouchStart("");
          setTimeout(resolve, 100);
        });
      }
    } catch (error) {
    }
  }
  async function clickRocket() {
    const rocketElement = document.querySelector('img[class^="_root"]');
    if (rocketElement) {
      try {
        rocketElement[Object.keys(rocketElement)[1]].onClick();
      } catch (error) {
        console.error("Error clicking rocket:", error);
      }
    }
  }
  async function autoClick() {
    const scoreElement = document.querySelector('div[class^="_scoreCurrent"]');
    let currentScore = Number.parseInt(scoreElement.textContent);
    await clickRocket();
    const numberOfClicks = Math.floor(Math.random() * (max_click_count - min_click_count + 1)) + min_click_count;
    for (let index = 0; index < numberOfClicks; index++) {
      if (currentScore > minimumEnergyForClick) {
        await clickCoin();
        currentScore = Number.parseInt(scoreElement.textContent);
        console.info(`%c ${numberOfClicks}`, "color: #64b5f6");
      } else {
        break;
      }
    }
  }
  setInterval(autoClick, clickInterval);
};

const getRandom = (min = 25, max = 400) => Math.floor(Math.random() * max) + min;

const getWait = (ms = getRandom(60, 123)) => new Promise((res) => setTimeout(res, ms));

const eventTypes = ["mouseover", "mousedown", "pointerdown", "pointerup", "mouseup", "click"];
const simulateMouseEvent = (element, eventType) => {
  const box = element.getBoundingClientRect();
  const coordX = box.left + (box.right - box.left) / 2;
  const coordY = box.top + (box.bottom - box.top) / 2;
  element.dispatchEvent(
    new MouseEvent(eventType, {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: coordX,
      clientY: coordY,
      button: 0
    })
  );
};
const simulateMouseClick = (targetNode) => {
  const triggerMouseEvent = (targetNode2, eventType) => {
    if (["pointerdown", "pointerup"].includes(eventType)) {
      simulateMouseEvent(targetNode2, eventType);
      return;
    }
    const clickEvent = document.createEvent("MouseEvents");
    clickEvent.initEvent(eventType, true, true);
    targetNode2.dispatchEvent(clickEvent);
  };
  eventTypes.forEach((eventType) => {
    triggerMouseEvent(targetNode, eventType);
  });
};

const touchEventTypes = ["touchstart", "touchmove", "touchend"];
const simulateTouch = (targetNode) => {
  const triggerTouchEvent = (targetNode2, eventType) => {
    const touchObject = new Touch({
      identifier: Date.now(),
      target: targetNode2,
      clientX: getRandom(22, 333),
      clientY: getRandom(22, 333),
      radiusX: 2.5,
      radiusY: 2.5,
      rotationAngle: 10,
      force: 0.5
    });
    const touchEvent = new TouchEvent(eventType, {
      cancelable: true,
      bubbles: true,
      touches: [touchObject],
      targetTouches: [],
      changedTouches: [touchObject],
      shiftKey: true
    });
    targetNode2.dispatchEvent(touchEvent);
  };
  touchEventTypes.forEach((eventType) => {
    triggerTouchEvent(targetNode, eventType);
  });
};

const goTypicalBot = (selectors) => {
  const clickCoin = () => {
    const coinButton = document.querySelector(selectors.coinClick);
    if (coinButton) {
      simulateMouseClick(coinButton);
      simulateTouch(coinButton);
      return true;
    }
  };
  const clickTabBotOkButton = () => {
    if (!selectors.tabBotOkText)
      return;
    [...document.querySelectorAll("button")].forEach((e) => {
      if (e.textContent === selectors.tabBotOkText) {
        simulateMouseClick(e);
        simulateTouch(e);
      }
    });
  };
  const getCounts = () => {
    const counts = document.querySelector(selectors.counts)?.textContent;
    console.log(`counts: ${counts}`);
    if (!counts)
      return 0;
    return +counts;
  };
  const getIsBoosted = () => {
    return selectors.boosted && document.querySelector(selectors.boosted);
  };
  let isInProgress = false;
  let count = 0;
  const start = async () => {
    if (isInProgress)
      return;
    clickTabBotOkButton();
    while (getCounts()) {
      isInProgress = true;
      if (clickCoin())
        console.log(`click #${++count}`);
      else
        console.log("fail click ");
      await (getIsBoosted() ? getWait(getRandom(1, 7)) : getWait(getRandom(25, 400)));
      isInProgress = false;
    }
  };
  setInterval(start, 3e3);
};

const selectors$3 = {
  coinClick: 'button [src="/clicker/mainButton/basic/button.png"]',
  counts: ".text-xl.text-white.font-medium"
};
const clixGame = () => {
  goTypicalBot(selectors$3);
};

const selectors$2 = {
  coinClick: ".coin-btn",
  counts: "span.text-3xl.font-bold"
};
const doxCoin = () => {
  goTypicalBot(selectors$2);
};

const selectors$1 = {
  coinClick: ".click-coin img",
  counts: ".click-limit__left",
  boosted: ".l-home.boost"
};
const limeCoin = () => {
  goTypicalBot(selectors$1);
  const url = "https://api.limecoin.online/points/receive/";
  const getParameters = (isBoost) => {
    const clicks = getRandom(1, 100);
    const divider = isBoost ? 1e3 : 1e4;
    return { clicks, points: clicks / divider };
  };
  const sendRequest = (newParameters = {}) => {
    return new Promise((res) => {
      const http = new XMLHttpRequest();
      http.open("POST", url);
      http.setRequestHeader("Content-type", "application/json");
      http.setRequestHeader("Authorization", window.AuthorizationHeaderLimeCoin ?? "");
      http.send(JSON.stringify(newParameters));
      http.addEventListener("load", function() {
        res(true);
      });
    });
  };
  const go = async (isBoost) => {
    if (!window.AuthorizationHeaderLimeCoin) {
      window.AuthorizationHeaderLimeCoin = prompt("Пожалуйста, скопируйте Authorization-хедер в запросах limeCoin");
      if (!window.AuthorizationHeaderLimeCoin) {
        alert("не получилось? Если захочешь запустить скрипт - просто обнови страницу");
        return;
      }
    }
    let count = 0;
    while (await sendRequest(getParameters(isBoost))) {
      console.log(`[${isBoost ? "boost" : "regular"}] request sent: ${++count}`);
    }
  };
  window.go = go;
  console.log("limeCoin: если хочешь прямые апи-запросы - запускай в консоле: go() - без буста, go(true) - с бустом");
};

const selectors = {
  coinClick: '[class^="_tapContent"] img',
  counts: '[class^="_value_"] h4',
  boosted: '[class^="_large"]',
  tapBotOkText: "Get it!"
};
const tapSwap = () => {
  goTypicalBot(selectors);
};

const buttonTexts = [
  "Начать игру",
  // @OfficialLimeCoinBot
  "Play",
  // @DOXcoin_BOT & @notcoin_bot & @tapswap_bot
  "Let’s go",
  // @notcoin_bot
  "Start now!"
  // @tapswap_bot
];
const goToAppFromTelegram = () => {
  const clickPlay = () => {
    [...document.querySelectorAll("button")].find((e) => {
      const content = e.textContent;
      const hasText = buttonTexts.some((text) => content?.includes(text));
      if (hasText) {
        simulateMouseClick(e);
        simulateTouch(e);
        return true;
      }
    });
  };
  const getIframe = () => document.querySelector("iframe");
  const clickLaunchIfIsset = () => {
    const launch = [...document.querySelectorAll(".popup-button")].find((e) => e.textContent === "Launch");
    if (launch) {
      launch.click();
    }
  };
  const start = async () => {
    if (getIframe())
      return;
    clickPlay();
    await getWait(2e3);
    clickLaunchIfIsset();
    await getWait(2e3);
    const iframe = getIframe();
    if (!iframe) {
      console.info("%c хуйня какая-то, начинай по новой", "color: #64b5f6");
      return start();
    }
    location.href = iframe.src.replace("tgWebAppPlatform=weba", "tgWebAppPlatform=ios").replace("tgWebAppPlatform=web", "tgWebAppPlatform=ios");
  };
  start();
};

const hostMap = {
  "web.telegram.org": goToAppFromTelegram,
  "webapp.limecoin.online": limeCoin,
  "doxcoin.net": doxCoin,
  "clicker.joincommunity.xyz": notCoin,
  "clix.game": clixGame,
  "app.tapswap.ai": tapSwap
};
const __main_def__ = async () => {
  const callback = hostMap[location.host];
  if (typeof callback === "function")
    return callback();
  console.log("nothing found");
};
__main_def__();
