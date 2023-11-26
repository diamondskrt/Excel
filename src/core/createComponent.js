import { DomListener } from './domListener';

export class CreateComponent extends DomListener {
  constructor(root, options) {
    super(root, options?.listeners);
    this.name = options?.name;
    this.emmiter = options?.emmiter;
    this.unsubscribes = [];
  }

  toHtml() {
    return '';
  }

  emit(event, params) {
    this.emmiter.emit(event, params);
  }

  subscribe(event, callback) {
    const unsubscribe = this.emmiter.subscribe(event, callback);
    this.unsubscribes.push(unsubscribe);
  }

  init() {
    this.initDomListeners();
  }

  destroy() {
    this.removeDomListeners();
    this.unsubscribes.forEach((unsubscribe) => unsubscribe());
  }
}
