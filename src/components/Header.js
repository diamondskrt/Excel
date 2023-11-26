import { CreateComponent } from '@/core';

export class Header extends CreateComponent {
  constructor(root, options) {
    super(root, {
      name: 'ExcelHeader',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }

  static wrapper = {
    class: 'excel__header',
    tag: 'header',
  };

  init() {
    super.init();

    const formula = this.root.el.querySelector('.formula-input');

    this.subscribe('table:select-cell', (selectedCell) => {
      formula.value = selectedCell.textContent;
    });

    this.subscribe('table:input', (text) => {
      formula.value = text;
    });
  }

  toHTML() {
    return `
      <div class="excel__header-appbar">
        <div class="appbar-input">
            <input type="text" class="input appbar-input" placeholder="Новая таблица">
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
        <input type="text" class="input formula-input border-none">
      </div>
    `;
  }

  input(event) {
    const text = event.target.value.trim();

    const isFormulaInput = event.target.classList.contains('formula-input');

    if (isFormulaInput) {
      this.emit('formula:input', text);
    }
  }

  keydown(event) {
    const isFormulaInput = event.target.classList.contains('formula-input');

    const keys = ['Enter', 'Tab'];

    if (isFormulaInput && keys.includes(event.key)) {
      event.preventDefault();

      this.emit('formula:enter');
    }
  }

  destroy() {
    super.destroy();
  }
}
