import { DomListener } from './domListener';

export class Component extends DomListener {
  constructor(root, options) {
    super(root, options?.listeners);
    this.name = options?.name;
    this.emmiter = options?.emmiter;
    this.store = options?.store;
    this.subscribeOnStates = options?.subscribeOnStates || [];
    this.unsubscribes = [];
    this.beforeInit();
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

  onStateChanged(callback) {
    const unsubscribe = this.store.on(callback);
    this.unsubscribes.push(unsubscribe);
  }

  onStoreDispatch(action) {
    this.store.dispatch(action);
  }

  beforeInit() {}

  init() {
    this.initDomListeners();
  }

  destroy() {
    this.removeDomListeners();
    this.unsubscribes.forEach((unsubscribe) => unsubscribe());
  }
}
