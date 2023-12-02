import { addCss } from '@/utils';

class Dom {
  constructor(selector) {
    this.el = selector === 'string' ? document.querySelector(selector) : selector;
  }

  on(event, callback) {
    this.el.addEventListener(event, callback);
  }

  off(event, callback) {
    this.el.removeEventListener(event, callback);
  }

  getCoords() {
    return this.el.getBoundingClientRect();
  }

  css(styles) {
    addCss(this.el, styles);
  }
}

export const dom = (selector) => new Dom(selector);
