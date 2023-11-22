import { CreateComponent } from '@/core';

export class Header extends CreateComponent {
  constructor(root) {
    super(root, {
      name: 'ExcelHeader',
      listeners: ['input', 'click'],
    });
  }

  static wrapper = {
    class: 'excel__header',
    tag: 'header',
  };

  toHTML() {
    return `
      <div class="excel__header-appbar">
        <div class="appbar-input">
            <input type="text" class="input" placeholder="Новая таблица">
        </div>
        <div class="appbar-actions">
          <button type="button" class="btn btn-icon">
            <i class="material-symbols-rounded">
              delete
            </i>
          </button>
          <button type="button" class="btn btn-icon">
            <i class="material-symbols-rounded">
              logout
            </i>
          </button>
          <button type="button" class="btn btn-icon">
            <i class="material-symbols-rounded">
              dark_mode
            </i>
          </button>
        </div>
      </div>
      <div class="excel__header-toolbar">
        <div class="toolbar-actions">
          <button type="button" class="btn btn-icon">
            <i class="material-symbols-rounded">
              format_bold
            </i>
          </button>
          <button type="button" class="btn btn-icon">
            <i class="material-symbols-rounded">
              format_italic
            </i>
          </button>
          <button type="button" class="btn btn-icon">
            <i class="material-symbols-rounded">
              format_align_left
            </i>
          </button>
          <button type="button" class="btn btn-icon">
            <i class="material-symbols-rounded">
              format_align_center
            </i>
          </button>
          <button type="button" class="btn btn-icon">
            <i class="material-symbols-rounded">
              format_align_right
            </i>
          </button>
        </div>
      </div>
      <div class="excel__header-formula">
        <div class="formula-function">
          <i class="material-symbols-rounded">
            function
          </i>
        </div>
        <input type="text" class="input border-none">
      </div>
    `;
  }

  input(event) {
    console.log('input', event);
  }

  click(event) {
    console.log('click', event);
  }
}
