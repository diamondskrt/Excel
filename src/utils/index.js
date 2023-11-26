export const createElement = (tagName, className) => {
  const el = document.createElement(tagName);

  if (className) {
    el.classList.add(className);
  }

  return el;
};

export const range = (start, end) => new Array((start > end ? start - end : end - start) + 1)
  .fill('')
  .map((_, index) => (start > end ? end : start) + index);
