interface Point {
  x: number;
  y: number;
}

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;

  left: number;
  top: number;
  right: number;
  bottom: number;
}

/**
 *
 * @param {HTMLElement} child
 * @param {HTMLElement} parent
 * @returns
 */
export const getOffsetRelativeToParent = (child: HTMLElement, parent: HTMLElement): Point => {
  let x: number = 0;
  let y: number = 0;

  let b: number = 0;

  while (child && child !== parent) {
    x += child.offsetLeft;
    y += child.offsetTop;
    child = child.offsetParent as HTMLElement;
    if (b++ > 50) {
      console.log(child);
      break;
    }
  }

  return { x, y };
};

export const getBoundingClientRelativeToParent = (element: HTMLElement, parent: HTMLElement): Rect => {
  const { x, y } = getOffsetRelativeToParent(element, parent);
  const { width, height } = element.getBoundingClientRect();

  // happy-dom doesn't support new DOMRect() constructor,
  // once it does we can simplify this
  return {
    x,
    y,
    width,
    height,

    left: x,
    top: y,
    right: x + width,
    bottom: y + height,
  };
};

/**
 * Checks if there is any modal/overlay UI currently open.
 *
 * @returns {boolean}
 */
export const hasOpenModal = (): boolean => {
  return document.querySelector('[data-radix-focus-guard]') !== null;
};
