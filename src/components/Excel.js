import {
  dom, createEmitter, createStore, createStoreSubscriber,
} from '@/core';
import { createElement, storage, debounce } from '@/utils';
import { rootReducer } from '@/store/rootReducer';
import { initialState } from '@/store/constants';
import { Header } from './header';
import { Table } from './table';

class Excel {
  constructor(options) {
    this.emmiter = createEmitter();
    this.store = createStore(rootReducer, storage.get('excel-store') || initialState);
    this.store.on(debounce((state) => storage.set({ key: 'excel-store', data: state }), 300));
    this.subscriber = createStoreSubscriber(this.store);
    this.root = createElement('div', 'excel');
    this.components = options?.components
      .map((Component) => {
        const createdElement = createElement(Component.wrapper.tag, Component.wrapper.class);
        const createdComponent = dom(createdElement);
        const component = new Component(createdComponent, {
          emmiter: this.emmiter,
          store: this.store,
        });

        createdComponent.el.innerHTML = component.toHTML();
        this.root.append(createdComponent.el);

        return component;
      }) || [];
  }

  mount(selector) {
    const el = document.querySelector(selector);

    el.append(this.root);

    this.subscriber.subscribe(this.components);

    this.components.forEach((component) => {
      component.init();
    });
  }

  unmount() {
    this.subscriber.unsubscribe();
    this.components.forEach((component) => component.destroy());
  }
}

export const excel = new Excel({
  components: [Header, Table],
});
