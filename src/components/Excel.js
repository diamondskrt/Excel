import { dom, Emitter } from '@/core';
import { createElement } from '@/utils';
import { Header } from './Header';
import { Table } from './table';

class Excel {
  constructor(options) {
    this.root = createElement('div', 'excel');

    this.emmiter = new Emitter();

    this.components = options?.components
      .map((Component) => {
        const createdElement = createElement(Component.wrapper.tag, Component.wrapper.class);
        const createdComponent = dom(createdElement);
        const component = new Component(createdComponent, {
          emmiter: this.emmiter,
        });

        createdComponent.el.innerHTML = component.toHTML();
        this.root.append(createdComponent.el);

        return component;
      }) || [];
  }

  mount(selector) {
    const el = document.querySelector(selector);

    el.append(this.root);

    this.components.forEach((component) => {
      component.init();
    });
  }

  unmount() {
    this.components.forEach((component) => component.destroy());
  }
}

export const excel = new Excel({
  components: [Header, Table],
});
