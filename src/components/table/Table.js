import { Component, dom } from '@/core';
import { actions } from '@/store/constants';
import { createTable } from './useTable';
import {
  select,
  selectGroup,
  getCells,
  getNextSelector,
  getCurrent,
  setCurrentText,
  setCurrentFocus,
  getGroupIds,
  setCurrentStyles,
} from './useTableSelection';
import { useResize } from './useResize';

export class Table extends Component {
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
    const state = this.store.getState();
    return createTable(state);
  }

  init() {
    super.init();

    const defaultSelectedCell = this.root.el.querySelector('[data-cell-id="A1"]');

    this.selectCell(defaultSelectedCell);

    this.subscribe('formula:input', (params) => {
      setCurrentText(params.text);

      const current = getCurrent();

      const data = {
        id: current.dataset.cellId,
        params,
      };

      this.onStoreDispatch({ type: actions.cellInput, data });
    });
    this.subscribe('formula:enter', () => {
      setCurrentFocus();
    });
    this.subscribe('toolbar-btn:click', (styles) => {
      const data = {
        ids: getGroupIds(),
        styles,
      };

      setCurrentStyles(styles);

      this.onStoreDispatch({ type: actions.toolbarBtnClick, data });
    });
  }

  selectCell(cell) {
    select(cell);

    this.emit('table:select-cell', cell);

    const {
      textAlign, fontWeight, fontStyle, textDecoration,
    } = cell.style;

    this.emit('table:set-cell-styles', {
      textAlign, fontWeight, fontStyle, textDecoration,
    });
  }

  input(event) {
    const text = event.target.textContent.trim();

    this.emit('table:input', event.target);

    const data = {
      id: event.target.dataset.cellId,
      params: {
        formula: '',
        text,
      },
    };

    this.onStoreDispatch({ type: actions.cellInput, data });
  }

  async mousedown(event) {
    const component = dom(event.target);
    const { dataset } = component.el;

    if (dataset?.resize) {
      try {
        const data = await useResize(component, dataset);
        this.onStoreDispatch({ type: actions.tableResize, data });
      } catch (error) {
        console.error(error.message);
      }
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
        this.selectCell(element);
      }
    }
  }

  keydown(event) {
    const keys = ['Enter', 'ArrowDown', 'Tab', 'ArrowRight', 'ArrowUp', 'ArrowLeft'];

    if (keys.includes(event.key) && !event.shiftKey) {
      event.preventDefault();

      const nextSelector = getNextSelector(event.key);
      const nextCell = this.root.el.querySelector(nextSelector);

      this.selectCell(nextCell);
    }
  }

  destroy() {
    super.destroy();
  }
}
