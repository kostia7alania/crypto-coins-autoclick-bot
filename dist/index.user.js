// ==UserScript==
// @name         Crypto Coins Auto Click Bot 
// @namespace    Violentmonkey Scripts


// @match        https://webapp.limecoin.online/*
// @match        https://web.telegram.org/k/#@OfficialLimeCoinBot

// @match        https://doxcoin.net/*
// @match        https://web.telegram.org/k/#@DOXcoin_BOT

// @match        https://clicker.joincommunity.xyz/*
// @match        https://web.telegram.org/k/#@notcoin_bot

// @match        https://clix.game/*
// @match        https://clix.game/

// @match        https://app.tapswap.ai/*
// @match        https://web.telegram.org/k/#@tapswap_bot

// @match        https://app.tapswap.club/*
// @match        https://web.telegram.org/k/#@tapswap_bot

// @match        https://the-pixels-game.fireheadz.games/*
// @match        https://web.telegram.org/k/#@the_pixels_bot

// @match        https://the-pixels.pages.dev/*
// @match        https://web.telegram.org/k/#@the_pixels_bot

// @match        https://arbuzapp.betty.games/*
// @match        https://web.telegram.org/k/#@wmclick_bot

// @match        https://yescoin.click/*
// @match        https://web.telegram.org/k/#@YesCoin_ebot

// @match        https://chukaka.github.io/*
// @match        https://web.telegram.org/k/#@mellcoinsbot

// @match        https://telegram.blum.codes/*
// @match        https://web.telegram.org/k/#@BlumCryptoBot

// @match        https://dot.dapplab.xyz/*
// @match        https://web.telegram.org/k/#@dotcoin_bot

// @match        https://hamsterkombat.io/*
// @match        https://web.telegram.org/k/#@hamster_kombat_bot


// @version      1.1.19
// @author       t.me/dvachers_space
// @description  first release: 29.03.2024, 13:33:33, last release: 11.06.2024, 15:15:52
// @downloadURL  https://github.com/kostia7alania/crypto-coins-autoclick-bot/raw/main/dist/index.user.js
// @updateURL    https://github.com/kostia7alania/crypto-coins-autoclick-bot/raw/main/dist/index.user.js
// @homepage     https://github.com/kostia7alania/crypto-coins-autoclick-bot
// @icon         https://cdn.joincommunity.xyz/clicker/moneta-small.png
// ==/UserScript==

const os = {};

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

const getClientXY = (targetNode) => {
  const box = targetNode.getBoundingClientRect();
  const clientX = box.left + (box.right - box.left) / 2 + getRandom(-100, 100);
  const clientY = box.top + (box.bottom - box.top) / 2 + getRandom(-100, 100);
  return {
    clientX,
    clientY
  };
};

const eventTypes = ["mouseover", "mousedown", "pointerdown", "pointerup", "mouseup", "click"];
const simulateMouseEvent = (targetNode, eventType) => {
  const { clientX, clientY } = getClientXY(targetNode);
  targetNode.dispatchEvent(
    new MouseEvent(eventType, {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX,
      clientY,
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
    const { clientX, clientY } = getClientXY(targetNode2);
    const touchObject = new Touch({
      identifier: Math.random(),
      target: targetNode2,
      clientX,
      clientY,
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

let isInProgress$1 = false;
let count$1 = 0;
const clickByText = (selector, text, isExact = false) => {
  const find = [...document.querySelectorAll(selector)].find(
    (el) => isExact ? el.textContent === text : el.textContent?.includes(text)
  );
  if (!find || find.hasAttribute("disabled"))
    return false;
  simulateMouseClick(find);
  simulateTouch(find);
  return true;
};
const goTypicalBot = (selectors) => {
  window.maxWait = 400;
  const clickCoin = () => {
    const coinButton = document.querySelector(selectors.coinClick);
    if (coinButton) {
      simulateMouseClick(coinButton);
      simulateTouch(coinButton);
      return true;
    }
  };
  const clickTabBotOkButton = () => {
    if (!selectors.okText)
      return;
    [...document.querySelectorAll("button")].forEach((e) => {
      if (e.textContent === selectors.okText) {
        simulateMouseClick(e);
        simulateTouch(e);
      }
    });
  };
  const getCounts = () => {
    if (!selectors.counts)
      return Infinity;
    const counts = document.querySelector(selectors.counts)?.textContent;
    if (!counts)
      return 0;
    return Number.parseInt(counts.replace(",", ""));
  };
  const getIsBoosted = () => {
    return selectors.boosted && document.querySelector(selectors.boosted);
  };
  let isBoostInProgress = false;
  const temporaryBlockedBoostSections = {
    //
  };
  const applyBoost = async (section) => {
    const boosterItem = selectors?.boosters?.[section];
    if (!boosterItem)
      return;
    if (isBoostInProgress || temporaryBlockedBoostSections[section])
      return;
    try {
      isBoostInProgress = true;
      clickByText(boosterItem?.section.selector, boosterItem.section.text);
      await getWait(3e3);
      if (!clickByText(boosterItem.item.selector, boosterItem.item.text)) {
        temporaryBlockedBoostSections[section] = true;
        setTimeout(() => temporaryBlockedBoostSections[section] = false, 1e4);
      }
      await getWait(3e3);
      if (clickByText(boosterItem.confirm.selector, boosterItem.confirm.text)) {
        setTimeout(() => temporaryBlockedBoostSections[section] = false, 1e5);
      }
      await getWait(3e3);
    } finally {
      isBoostInProgress = false;
      await clickByText(boosterItem.fallback.selector, boosterItem.fallback.text, true);
    }
  };
  const start = async () => {
    if (isInProgress$1)
      return;
    clickTabBotOkButton();
    let counts = 0;
    while ((counts = getCounts()) > 10) {
      isInProgress$1 = true;
      if (clickCoin()) {
        if (!window.silent)
          console.log(`click #${++count$1} :: ${counts}`);
      } else {
        console.log("fail click ");
      }
      await (getIsBoosted() ? getWait(getRandom(1, 7)) : getWait(getRandom(25, window.maxWait)));
      isInProgress$1 = false;
    }
    if (selectors?.boosters) {
      console.log("after selectors?.boosters", selectors?.boosters);
      Object.keys(selectors?.boosters).forEach(applyBoost);
    }
  };
  setInterval(start, 3e3);
};

const selectors$9 = {
  coinClick: 'button [src="/clicker/mainButton/base/button.png"]',
  counts: ".text-xl.text-white.font-medium"
};
const clixGame = () => {
  goTypicalBot(selectors$9);
};

const selectors$8 = {
  coinClick: ".coin-btn",
  counts: "span.text-3xl.font-bold"
};
const doxCoin = () => {
  goTypicalBot(selectors$8);
};

const selectors$7 = {
  coinClick: ".click-coin img",
  counts: ".click-limit__left",
  boosted: ".l-home.boost"
};
let hasBoost = true;
const getBoost = async () => {
  if (!hasBoost)
    return;
  const getIsBoosted = () => document.querySelector(selectors$7.boosted);
  const getRocketButton = () => document.querySelector('[alt="flash"]');
  const getBoostCount = () => document.querySelector(".list-item__coins");
  const getBoostTrigger = getBoostCount;
  if (!getRocketButton() || getIsBoosted()) {
    await getWait(3e3);
    getBoost();
    return;
  }
  getRocketButton()?.click();
  await getWait(3e3);
  if (Number.parseInt(getBoostCount()?.textContent ?? "0") === 0) {
    hasBoost = false;
  }
  getBoostTrigger()?.click();
  await getWait(18 * 1e3);
  getBoost();
};
const limeCoin = () => {
  goTypicalBot(selectors$7);
  getBoost();
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
  const goLimeCoinDirect = async (isBoost) => {
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
  window.goLimeCoin = goLimeCoinDirect;
  console.log("limeCoin: если хочешь прямые апи-запросы - запускай в консоле: go() - без буста, go(true) - с бустом");
};

const selectors$6 = {
  coinClick: '[class^="_tapContent"] img',
  counts: '[class^="_value_"] h4',
  boosted: '[class^="_tapContainer"]:not(.undefined)',
  // _boostCoinBg_
  okText: "Get it!",
  boosters: {
    guru: {
      section: { selector: "button", text: "Boost" },
      item: { selector: "button", text: "Taping Guru" },
      confirm: { selector: "button", text: "Get it!" },
      fallback: { selector: "button", text: "Tap" }
    },
    full: {
      section: { selector: "button", text: "Boost" },
      item: { selector: "button", text: "Full Tank" },
      confirm: { selector: "button", text: "Get it!" },
      fallback: { selector: "button", text: "Tap" }
    }
  }
};
const tapSwap = () => {
  goTypicalBot(selectors$6);
};

let isInProgress = false;
let count = 0;
const thePixels = () => {
  const anyClick = () => {
    const found = [...document.querySelectorAll('[class^="BlackButtonStyled"]:not(:disabled)')].find((e) => {
      return ["Push", "Grab", "Next Pixel"].find((text) => e.textContent?.includes(text));
    });
    if (!found)
      return false;
    simulateMouseClick(found);
    simulateTouch(found);
    return true;
  };
  const getCounts = () => {
    const counts = document.querySelector("[class^=TargetProgressInfo]")?.textContent?.split("/").at(0);
    if (!counts)
      return 0;
    return +counts;
  };
  const start = async () => {
    if (isInProgress)
      return;
    let counts = 0;
    while (counts = getCounts()) {
      isInProgress = true;
      if (anyClick()) {
        if (!window.silent)
          console.log(`click #${++count} :: ${counts}`);
      } else {
        console.log("fail click ");
      }
      await getWait(getRandom(333, 1e3));
      isInProgress = false;
    }
  };
  setInterval(start, 3e3);
};

const selectors$5 = {
  coinClick: ".game__field",
  counts: ".energy__value.current-value"
};
const arbuzApp = () => {
  goTypicalBot(selectors$5);
};

const selectors$4 = {
  coinClick: 'img[alt="Clicker Coin"]',
  counts: "app-player-energy .typo-number > span"
};
const yesCoin = () => {
  goTypicalBot(selectors$4);
};

const selectors$3 = {
  coinClick: ".coin-image",
  counts: ""
};
const mellCoin = () => {
  goTypicalBot(selectors$3);
};

const selectors$2 = {
  coinClick: ".kit-button",
  counts: ""
};
const blumCrypto = () => {
  goTypicalBot(selectors$2);
  window.maxWait = 1e3 * 60;
};

const selectors$1 = {
  coinClick: ".ClickerCoinDot",
  counts: ""
};
const dotCoin = () => {
  goTypicalBot(selectors$1);
};

const selectors = {
  coinClick: ".user-tap-button",
  counts: ".user-tap-energy",
  boosters: {
    full: {
      section: { selector: ".user-tap-boost", text: "Boost" },
      item: { selector: ".boost-item:not(.is-not-available)", text: "Full energy" },
      confirm: { selector: ".bottom-sheet-button", text: "" },
      fallback: { selector: "button", text: "Tap" }
    }
  }
};
const hamsterCoin = () => {
  goTypicalBot(selectors);
};

const buttonTexts = [
  "Начать игру",
  // @OfficialLimeCoinBot
  "Play",
  // @DOXcoin_BOT & @notcoin_bot & @tapswap_bot
  "Let’s go",
  // @notcoin_bot
  "Start now!",
  // @tapswap_bot
  "Играть",
  // @mellcoinsbot
  "Launch Blum",
  // @BlumCryptoBot
  "Explore your frens",
  // @BlumCryptoBot
  "LAUNCH APP"
  // @BlumCryptoBot
];
const goToAppFromTelegram = (maybeCallbacks) => {
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
    if (!preventGoFullScreen.includes(location.href)) {
      location.href = iframe.src.replace("tgWebAppPlatform=weba", "tgWebAppPlatform=ios").replace("tgWebAppPlatform=web", "tgWebAppPlatform=ios");
    }
    maybeCallbacks().forEach((callback) => callback());
  };
  start();
};

const preventGoFullScreen = [
  "https://web.telegram.org/k/#@BlumCryptoBot",
  "https://web.telegram.org/k/#@YesCoin_ebot"
];
const appsHostMap = {
  "web.telegram.org": [goToAppFromTelegram.bind(null, runInWindow), ""],
  "webapp.limecoin.online": [limeCoin, "https://web.telegram.org/k/#@OfficialLimeCoinBot"],
  "doxcoin.net": [doxCoin, "https://web.telegram.org/k/#@DOXcoin_BOT"],
  "clicker.joincommunity.xyz": [notCoin, "https://web.telegram.org/k/#@notcoin_bot"],
  "clix.game": [clixGame, "https://clix.game/"],
  "app.tapswap.ai": [tapSwap, "https://web.telegram.org/k/#@tapswap_bot"],
  "app.tapswap.club": [tapSwap, "https://web.telegram.org/k/#@tapswap_bot"],
  "the-pixels-game.fireheadz.games": [thePixels, "https://web.telegram.org/k/#@the_pixels_bot"],
  "the-pixels.pages.dev": [thePixels, "https://web.telegram.org/k/#@the_pixels_bot"],
  "arbuzapp.betty.games": [arbuzApp, "https://web.telegram.org/k/#@wmclick_bot"],
  "yescoin.click": [yesCoin, "https://web.telegram.org/k/#@YesCoin_ebot"],
  "chukaka.github.io": [mellCoin, "https://web.telegram.org/k/#@mellcoinsbot"],
  "telegram.blum.codes": [blumCrypto, "https://web.telegram.org/k/#@BlumCryptoBot"],
  "dot.dapplab.xyz": [dotCoin, "https://web.telegram.org/k/#@dotcoin_bot"],
  "hamsterkombat.io": [hamsterCoin, "https://web.telegram.org/k/#@hamster_kombat_bot"]
};
function runInWindow() {
  return Object.values(appsHostMap).filter(([_, url]) => preventGoFullScreen.includes(url)).map(([callback]) => callback);
}

const urls = Object.entries(appsHostMap);
const getMatchesFromMap = () => {
  return urls.filter(([_, [, tg]]) => tg).reduce((acc, [url, [, tg]]) => {
    return acc + `${os.EOL}// @match        https://${url}/*${os.EOL}// @match        ${tg}${os.EOL}`;
  }, "");
};

const __main_def__ = async () => {
  const [callback] = appsHostMap[location.host];
  if (typeof callback === "function") {
    callback();
    return;
  }
  console.log("nothing found");
};
__main_def__();
setTimeout(location.reload, 3 * 1e3 * 60 * 60);
