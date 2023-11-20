import { CreateComponent } from '@/core';
import { createTable } from './useTable';

export class Table extends CreateComponent {
  constructor(root) {
    super(root, {
      name: 'ExcelTable',
      listeners: ['input'],
    });
  }

  static selector = '.excel__table';

  toHTML() {
    const options = { rows: 20 };

    return createTable(options);
  }
}
