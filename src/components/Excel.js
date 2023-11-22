import { dom } from '@/core';
import { createElement } from '@/utils/dom';
import { Header } from './Header';
import { Table } from './table';

class Excel {
  constructor(options) {
    this.root = createElement('div', 'excel');
    this.components = options?.components
      .map((Component) => {
        const createdComponent = dom(createElement(Component.wrapper.tag, Component.wrapper.class));
        const component = new Component(createdComponent);
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
}

export const excel = new Excel({
  components: [Header, Table],
});
