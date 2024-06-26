export const notCoin = () => {
  // get updates from https://github.com/mudachyo/notcoin-bot

  // Configuration options
  const minimumEnergyForClick = 900; // Minimum energy required to perform a click on the coin
  const min_click_count = 30; // Minimum number of clicks to perform in each auto-click cycle
  const max_click_count = 100; // Maximum number of clicks to perform in each auto-click cycle
  const clickInterval = 500; // Time interval (in milliseconds) between auto-click cycles

  // Function to click on the coin element
  async function clickCoin() {
    try {
      const coinElement = document.querySelector('div[class^="_notcoin"]');
      if (coinElement) {
        await new Promise((resolve) => {
          // @ts-ignore
          coinElement[Object.keys(coinElement)[1]].onTouchStart('');
          setTimeout(resolve, 100);
        });
      }
    } catch (error) {}
  }

  // Function to click on the rocket element, if it exists
  async function clickRocket() {
    const rocketElement = document.querySelector('img[class^="_root"]');
    if (rocketElement) {
      try {
        // @ts-ignore
        rocketElement[Object.keys(rocketElement)[1]].onClick();
      } catch (error) {
        console.error('Error clicking rocket:', error);
      }
    }
  }

  // Main function to perform the auto-clicking
  async function autoClick() {
    const scoreElement = document.querySelector('div[class^="_scoreCurrent"]');
    // @ts-ignore
    let currentScore = Number.parseInt(scoreElement.textContent);

    // Click on the rocket first, if available
    await clickRocket();

    // Generate a random number of clicks between min and max
    const numberOfClicks = Math.floor(Math.random() * (max_click_count - min_click_count + 1)) + min_click_count;

    // Click on the coin repeatedly until the energy is depleted or the click count is reached
    for (let index = 0; index < numberOfClicks; index++) {
      if (currentScore > minimumEnergyForClick) {
        await clickCoin();
        // @ts-ignore
        currentScore = Number.parseInt(scoreElement.textContent);
        // Log the generated numberOfClicks value
        console.info(`%c ${numberOfClicks}`, 'color: #64b5f6');
      } else {
        break;
      }
    }
  }
  // Repeat the auto-clicking process every clickInterval milliseconds
  setInterval(autoClick, clickInterval);
};
