// ==UserScript==
// @name         Crypto Auto-Click Bot
// @namespace    Violentmonkey Scripts
// @match        https://clicker.joincommunity.xyz/clicker*
// @match        https://clix.game/*
// @match        https://doxcoin.net/game*

// @match       https://web.telegram.org/k/#@OfficialLimeCoinBot
// @match       https://web.telegram.org/k/#@DOXcoin_BOT
// @match       https://web.telegram.org/k/#@notcoin_bot

// @match       https://webapp.limecoin.online/*

// @version      1.0
// @author       t.me/dvachers_space
// @description  29.03.2024, 13:33:33
// @downloadURL  https://github.com/kostia7alania/crypto-coins-autoclick-bot/raw/main/dist/index.user.js
// @updateURL    https://github.com/kostia7alania/crypto-coins-autoclick-bot/raw/main/dist/index.user.js
// @homepage     https://github.com/kostia7alania/crypto-coins-autoclick-bot
// @icon         https://cdn.joincommunity.xyz/clicker/moneta-small.png
// ==/UserScript==

const f = () => {
  async function t() {
    try {
      const e = document.querySelector('div[class^="_notcoin"]');
      e && await new Promise((l) => {
        e[Object.keys(e)[1]].onTouchStart(""), setTimeout(l, 100);
      });
    } catch {
    }
  }
  async function r() {
    const e = document.querySelector('img[class^="_root"]');
    if (e)
      try {
        e[Object.keys(e)[1]].onClick();
      } catch (l) {
        console.error("Error clicking rocket:", l);
      }
  }
  async function s() {
    const e = document.querySelector('div[class^="_scoreCurrent"]');
    let l = Number.parseInt(e.textContent);
    await r();
    const u = Math.floor(Math.random() * 71) + 30;
    for (let m = 0; m < u && l > 900; m++)
      await t(), l = Number.parseInt(e.textContent), console.info(`%c ${u}`, "color: #64b5f6");
  }
  setInterval(s, 500);
}, a = (o = 25, n = 400) => Math.floor(Math.random() * n) + o, d = (o) => {
  const n = (e = a(25, 400)) => new Promise((l) => setTimeout(l, e)), i = () => {
    document.querySelector(o.coinClick).click();
  }, c = () => {
    const e = document.querySelector(o.counts)?.textContent;
    return console.log(`counts: ${e}`), e ? +e : 0;
  };
  let t = !1, r = 0;
  setInterval(async () => {
    if (!t)
      for (; c(); )
        t = !0, i(), console.log(`click #${++r}`), await n(), t = !1;
  }, 3e3);
}, p = {
  coinClick: 'button [src="/clicker/mainButton/basic/button.png"]',
  counts: ".text-xl.text-white.font-medium"
}, k = () => {
  d(p);
}, g = {
  coinClick: ".coin-btn",
  counts: "span.text-3xl.font-bold"
}, w = () => {
  d(g);
}, y = () => {
  if (!window.AuthorizationHeaderLimeCoin && (window.AuthorizationHeaderLimeCoin = prompt("Пожалуйста, скопируйте Authorization-хедер в запросах limeCoin"), !window.AuthorizationHeaderLimeCoin)) {
    alert("не получилось? Если захочешь запустить скрипт - просто обнови страницу");
    return;
  }
  const o = "https://api.limecoin.online/points/receive/", n = (t) => {
    const r = a(1, 100);
    return { clicks: r, points: r / (t ? 1e3 : 1e4) };
  }, i = (t = {}) => new Promise((r) => {
    const s = new XMLHttpRequest();
    s.open("POST", o), s.setRequestHeader("Content-type", "application/json"), s.setRequestHeader("Authorization", window.AuthorizationHeaderLimeCoin ?? ""), s.send(JSON.stringify(t)), s.addEventListener("load", function() {
      r(!0);
    });
  }), c = async (t) => {
    let r = 0;
    for (; await i(n(t)); )
      console.log(`[${t ? "boost" : "regular"}] request sent: ${++r}`);
  };
  window.go = c;
}, h = (o = a(60, 123)) => new Promise((n) => setTimeout(n, o)), C = ["mouseover", "mousedown", "mouseup", "click"], b = (o) => {
  const n = (i, c) => {
    const t = document.createEvent("MouseEvents");
    t.initEvent(c, !0, !0), i.dispatchEvent(t);
  };
  C.forEach((i) => {
    n(o, i);
  });
}, x = [
  "Начать игру",
  // @OfficialLimeCoinBot
  "Play",
  // @DOXcoin_BOT & @notcoin_bot
  "Let’s go"
  // @notcoin_bot
], v = () => {
  const o = () => {
    [...document.querySelectorAll("button")].find((c) => {
      const t = c.textContent;
      if (x.some((s) => t?.includes(s)))
        return b(c), !0;
    });
  }, n = () => document.querySelector("iframe"), i = async () => {
    if (n())
      return;
    o(), await h(3e3);
    const c = n();
    if (!c)
      return console.info("%c хуйня какая-то, начинай по новой", "color: #64b5f6"), i();
    location.href = c.src.replace("tgWebAppPlatform=weba", "tgWebAppPlatform=ios").replace("tgWebAppPlatform=web", "tgWebAppPlatform=ios");
  };
  i();
}, _ = {
  "web.telegram.org": v,
  "webapp.limecoin.online": y,
  "https://doxcoin.net/game": w,
  "clicker.joincommunity.xyz": f,
  "clix.game": k
}, E = async () => {
  const o = _[location.host];
  if (typeof o == "function")
    return o();
  console.log("nothing found");
};
E();
