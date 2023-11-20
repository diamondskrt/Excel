export class DomListener {
  constructor(root, listeners = []) {
    this.root = root;
    this.listeners = listeners;
  }

  initDomListeners() {
    this.listeners.forEach((listener) => {
      this[listener] = this[listener]?.bind(this);
      this.root.on(listener, this[listener]);
    });
  }

  removeDomListeners() {
    this.listeners.forEach((listener) => {
      this.root.off(listener, this[listener]);
    });
  }
}
