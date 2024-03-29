import { getRandom } from './getRandom';

const touchEventTypes = ['touchstart', 'touchmove', 'touchend'] as const;
type TouchEventType = (typeof touchEventTypes)[number];

export const simulateTouch = (targetNode: HTMLElement) => {
  const triggerTouchEvent = (targetNode: HTMLElement, eventType: TouchEventType) => {
    const touchObject = new Touch({
      identifier: Date.now(),
      target: targetNode,
      clientX: getRandom(22, 333),
      clientY: getRandom(22, 333),
      radiusX: 2.5,
      radiusY: 2.5,
      rotationAngle: 10,
      force: 0.5,
    });

    const touchEvent = new TouchEvent(eventType, {
      cancelable: true,
      bubbles: true,
      touches: [touchObject],
      targetTouches: [],
      changedTouches: [touchObject],
      shiftKey: true,
    });

    targetNode.dispatchEvent(touchEvent);
  };

  touchEventTypes.forEach((eventType) => {
    triggerTouchEvent(targetNode, eventType);
  });
};
