const eventTypes = ['mouseover', 'mousedown', 'pointerdown', 'pointerup', 'mouseup', 'click'] as const;
type EventType = (typeof eventTypes)[number];

const simulateMouseEvent = (element: HTMLElement, eventType: EventType) => {
  // https://stackoverflow.com/a/72372309
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
      button: 0,
    }),
  );
};

export const simulateMouseClick = (targetNode: HTMLElement) => {
  const triggerMouseEvent = (targetNode: HTMLElement, eventType: EventType) => {
    if (['pointerdown', 'pointerup'].includes(eventType)) {
      simulateMouseEvent(targetNode, eventType);
      return;
    }
    const clickEvent = document.createEvent('MouseEvents');

    clickEvent.initEvent(eventType, true, true);
    targetNode.dispatchEvent(clickEvent);
  };

  eventTypes.forEach((eventType) => {
    triggerMouseEvent(targetNode, eventType);
  });
};
