import { CreateComponent } from '@/core';
import { createTable } from './useTable';
import { useResize } from './useResize';

export class Table extends CreateComponent {
  constructor(root) {
    super(root, {
      name: 'ExcelTable',
      listeners: ['mousedown'],
    });
  }

  static wrapper = {
    class: 'excel__table',
    tag: 'main',
  };

  toHTML() {
    const options = { rows: 100 };

    return createTable(options);
  }

  mousedown(event) {
    useResize(event);
  }
}
