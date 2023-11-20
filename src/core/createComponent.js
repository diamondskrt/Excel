import { DomListener } from './domListener';

export class CreateComponent extends DomListener {
  constructor(root, options) {
    super(root, options?.listeners);
    this.options = options;
  }

  toHtml() {
    return '';
  }

  init() {
    this.initDomListeners();
  }

  destroy() {
    this.removeDomListeners();
  }
}
