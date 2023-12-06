import { iconEnums } from './constants';

const getButtons = (styles) => {
  const {
    textAlign, fontWeight, fontStyle, textDecoration,
  } = styles;

  return [
    { icon: iconEnums.FORMAT_ALIGN_LEFT, active: textAlign === 'left' },
    { icon: iconEnums.FORMAT_ALIGN_CENTER, active: textAlign === 'center' },
    { icon: iconEnums.FORMAT_ALIGN_RIGHT, active: textAlign === 'right' },
    { icon: iconEnums.FORMAT_BOLD, active: fontWeight === 'bold' },
    { icon: iconEnums.FORMAT_ITALIC, active: fontStyle === 'italic' },
    { icon: iconEnums.FORMAT_UNDERLINED, active: textDecoration === 'underline' },
  ];
};

const getIconButton = (button) => {
  const { icon, active } = button;

  return `
    <button type="button" data-id="toolbar-btn" class="btn btn-icon ${active ? 'active' : ''}">
      <i class="material-symbols-rounded">
        ${icon}
      </i>
    </button>
  `;
};

export const createToolbar = (state) => {
  const { buttonStyles } = state;

  return `
    <div class="excel__header-toolbar">
      <div class="toolbar-actions">
        ${getButtons(buttonStyles).map(getIconButton).join('')}
      </div>
    </div>
  `;
};
