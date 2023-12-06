import { StatelessComponent } from '@/core';
import { redirectToHomePage } from '@/helpers';
import { storage } from '@/utils';
import { actions } from '@/store/constants';
import { createHeader } from './useHeader';
import { createStylesMap } from './helpers';

export class Header extends StatelessComponent {
  constructor(root, options) {
    super(root, {
      name: 'ExcelHeader',
      listeners: ['click', 'input', 'keydown'],
      ...options,
    });

    this.storageName = options.storageName;

    this.beforeInit();
  }

  static wrapper = {
    class: 'excel__header',
    tag: 'header',
  };

  beforeInit() {
    const initialState = {
      toolbar: {
        buttonStyles: {
          textAlign: 'left',
          fontWeight: 'normal',
          textDecoration: 'none',
          fontStyle: 'normal',
        },
      },
      formula: {
        value: '',
      },
    };

    this.initState(initialState);
  }

  init() {
    super.init();

    this.subscribe('table:input', (cell) => {
      this.state.formula.value = cell.textContent;
      this.setState(this.state);
    });

    this.subscribe('table:select-cell', (cell) => {
      const { cellId } = cell.dataset;
      const foundCell = this.store.getState().thCellData.find(({ id }) => id === cellId);
      this.state.formula.value = foundCell?.params.formula || cell.textContent;
      this.setState(this.state);
    });

    this.subscribe('table:set-cell-styles', (styles) => {
      this.state.toolbar.buttonStyles = {
        ...this.state.toolbar.buttonStyles,
        ...styles,
      };

      this.setState(this.state);

      this.emit('toolbar-btn:click', styles);
    });
  }

  get template() {
    const globalState = this.store.getState();
    return createHeader(this.state, globalState);
  }

  toHTML() {
    return this.template;
  }

  click(event) {
    const toolbarBtn = event.target.closest('button[data-id="toolbar-btn"]');

    if (toolbarBtn) {
      const icon = toolbarBtn.querySelector('i')?.textContent?.trim();

      const stylesMap = createStylesMap(this.state.toolbar.buttonStyles);

      this.state.toolbar.buttonStyles = {
        ...this.state.toolbar.buttonStyles,
        ...stylesMap[icon],
      };

      this.setState(this.state);

      this.emit('toolbar-btn:click', stylesMap[icon]);
    }

    const appbarBtn = event.target.closest('button[data-id="appbar-btn"]');

    if (appbarBtn) {
      const icon = appbarBtn.querySelector('i')?.textContent?.trim();

      if (icon === 'logout') {
        redirectToHomePage();
      } else if (icon === 'delete') {
        // eslint-disable-next-line no-alert
        const decision = window.confirm('Вы действительно хотите удалить таблицу?');

        if (!decision) return;

        storage.remove(this.storageName);
        redirectToHomePage();
      }
    }
  }

  input(event) {
    const isFormulaInput = event.target.dataset.id === 'formula-input';

    if (isFormulaInput) {
      const params = {
        formula: '',
        text: '',
      };

      params.text = event.target.value.trim();

      const isFormula = /^=\d+[-+*/][-+*/\d]+$/.test(params.text);

      if (isFormula) {
        if (!Number(params.text[params.text.length - 1])) {
          params.text = params.text.slice(0, -1);
        }

        try {
          params.formula = params.text;
          // eslint-disable-next-line no-eval
          params.text = String(eval(params.text.substring(1)));
        } catch {
          console.error('Введите корректную формулу');
        }

        this.emit('formula:input', params);
      } else {
        this.emit('formula:input', params);
      }
    }

    const isAppBarInput = event.target.dataset.id === 'appbar-input';

    if (isAppBarInput) {
      const text = event.target.textContent.trim();
      this.onStoreDispatch({ type: actions.appTitleEdit, data: text });
    }
  }

  keydown(event) {
    const isFormulaInput = event.target.dataset.id === 'formula-input';

    const keys = ['Enter', 'Tab'];

    if (isFormulaInput && keys.includes(event.key)) {
      event.preventDefault();

      this.emit('formula:enter');
    }
  }

  unmount() {
    super.unmount();
  }
}
