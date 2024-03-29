const eventTypes = ['mouseover', 'mousedown', 'mouseup', 'click'] as const;
type EventType = (typeof eventTypes)[number];

export const simulateMouseClick = (targetNode: HTMLElement) => {
  const triggerMouseEvent = (targetNode: HTMLElement, eventType: EventType) => {
    const clickEvent = document.createEvent('MouseEvents');

    clickEvent.initEvent(eventType, true, true);
    targetNode.dispatchEvent(clickEvent);
  };

  eventTypes.forEach((eventType) => {
    triggerMouseEvent(targetNode, eventType);
  });
};
