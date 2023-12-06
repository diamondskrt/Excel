import {
  dom, createEmitter, createStore, createStoreSubscriber,
} from '@/core';
import {
  createElement, storage, debounce, preventDefault,
} from '@/utils';
import { redirectToHomePage } from '@/helpers';
import { rootReducer } from '@/store/rootReducer';
import { actions, initialState } from '@/store/constants';
import { Header } from '@/components/excel/header';
import { Table } from '@/components/excel/table';

class Excel {
  constructor(routeParams) {
    this.routeParams = routeParams;
    if (!this.routeParams.params.id) {
      redirectToHomePage();
    }
    this.storageName = `excel:${this.routeParams.params.id}`;
    this.emmiter = createEmitter();
    this.store = createStore(rootReducer, storage.get(this.storageName) || initialState);
    this.store.on(debounce((state) => storage.set(
      { key: this.storageName, data: state },
    ), 300));
    this.subscriber = createStoreSubscriber(this.store);
    this.root = createElement('div', 'excel');
    this.components = [Header, Table]
      .map((Component) => {
        const createdElement = createElement(Component.wrapper.tag, Component.wrapper.class);
        const createdComponent = dom(createdElement);
        const component = new Component(createdComponent, {
          emmiter: this.emmiter,
          store: this.store,
          storageName: this.storageName,
        });

        createdComponent.el.innerHTML = component.toHTML();
        this.root.append(createdComponent.el);

        return component;
      }) || [];
  }

  getRoot() {
    return this.root;
  }

  init() {
    this.store.dispatch({ type: actions.updateLastOpenDate, data: new Date() });
    this.subscriber.subscribe(this.components);

    this.components.forEach((component) => {
      component.init();
    });

    if (process.env.NODE_ENV !== 'production') return;

    document.addEventListener('contextmenu', preventDefault);
  }

  unmount() {
    this.subscriber.unsubscribe();
    this.components.forEach((component) => component.unmount());

    if (process.env.NODE_ENV !== 'production') return;

    document.removeEventListener('contextmenu', preventDefault);
  }
}

export const excel = (routeParams) => new Excel(routeParams);
