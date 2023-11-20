class Dom {
  constructor(selector) {
    this.selector = selector;
  }

  on(event, callback) {
    const el = document.querySelector(this.selector);
    el.addEventListener(event, callback);
  }

  off(event, callback) {
    const el = document.querySelector(this.selector);
    el.removeEventListener(event, callback);
  }
}

export const dom = (selector) => new Dom(selector);
