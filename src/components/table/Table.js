import { CreateComponent, dom } from '@/core';
import { createTable } from './useTable';
import {
  select, selectGroup, getCells, getNextSelector, setCurrentText, setCurrentFocus,
} from './useTableSelection';
import { useResize } from './useResize';

export class Table extends CreateComponent {
  constructor(root, options) {
    super(root, {
      name: 'ExcelTable',
      listeners: ['input', 'mousedown', 'click', 'keydown'],
      ...options,
    });
  }

  static wrapper = {
    class: 'excel__table',
    tag: 'main',
  };

  toHTML() {
    return createTable();
  }

  init() {
    super.init();

    const defaultSelectedCell = this.root.el.querySelector('[data-cell-id="A1"]');

    select(defaultSelectedCell);
    this.emit('table:select-cell', defaultSelectedCell);

    this.subscribe('formula:input', (text) => {
      setCurrentText(text);
    });
    this.subscribe('formula:enter', () => {
      setCurrentFocus();
    });
  }

  input(event) {
    const text = event.target.textContent.trim();

    this.emit('table:input', text);
  }

  mousedown(event) {
    const component = dom(event.target);
    const { dataset } = component.el;

    if (dataset?.resize) {
      useResize(component, dataset);
    }
  }

  click(event) {
    const element = event.target;
    const { dataset } = element;

    if (dataset?.cellId) {
      if (event.shiftKey) {
        const cells = getCells(element)
          .map((id) => this.root.el.querySelector(`[data-cell-id="${id}"]`));

        selectGroup(cells);
      } else {
        select(element);
        this.emit('table:select-cell', element);
      }
    }
  }

  keydown(event) {
    const keys = ['Enter', 'ArrowDown', 'Tab', 'ArrowRight', 'ArrowUp', 'ArrowLeft'];

    if (keys.includes(event.key) && !event.shiftKey) {
      event.preventDefault();

      const nextSelector = getNextSelector(event.key);
      const nextCell = this.root.el.querySelector(nextSelector);

      select(nextCell);
      this.emit('table:select-cell', nextCell);
    }
  }

  destroy() {
    super.destroy();
  }
}
