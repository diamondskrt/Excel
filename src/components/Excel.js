import { dom } from '@/core/dom';
import { createElement } from '@/utils/dom';
import { Header } from './Header';
import { Table } from './table';

class Excel {
  constructor(options) {
    this.root = createElement('div', 'excel');
    this.components = options?.components
      .map((Component) => {
        const el = dom(Component.selector);
        const component = new Component(el);

        return component;
      }) || [];
  }

  mount(selector) {
    const el = document.querySelector(selector);

    el.append(this.root);

    this.components.forEach((component) => {
      this.root.insertAdjacentHTML('beforeend', component.toHTML());
      component.init();
    });
  }
}

export const excel = new Excel({
  components: [Header, Table],
});
