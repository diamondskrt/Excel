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

export const storage = {
  get: (key) => JSON.parse(localStorage.getItem(key)),
  set: (options) => localStorage.setItem(options.key, JSON.stringify(options.data)),
  remove: (key) => localStorage.removeItem(key),
};

export const addCss = (element, styles) => {
  Object.keys(styles).forEach((key) => {
    const el = element;
    el.style[key] = styles[key];
  });
};

export const camelCaseToDash = (string) => string.replace(/[A-Z]/g, (l) => `-${l.toLowerCase()}`);

export const objectStylesToString = (styles) => Object.keys(styles)
  .map((key) => (styles[key] ? `${camelCaseToDash(key)}: ${styles[key]}` : null))
  .filter(Boolean)
  .join('; ');

export const debounce = (fn, ms) => {
  let timeout;

  return function fnCallWithTimeout(...args) {
    const fnCall = () => fn.apply(this, args);
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
};
