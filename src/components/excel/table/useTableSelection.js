import { range, addCss } from '@/utils';
import { charCodes, tableRows } from './useTable';

let group = [];
let current = null;

const clearGroup = () => {
  group.forEach((component) => component.removeAttribute('class'));
  group = [];
};

export const select = (selectedComponent) => {
  clearGroup();
  selectedComponent.classList.add('selected');
  selectedComponent.focus();
  group.push(selectedComponent);
  current = selectedComponent;
};

export const selectGroup = (selectedGroup) => {
  clearGroup();
  group = selectedGroup;
  group.forEach((component) => component.classList.add('selected'));
};

export const getCurrent = () => current;

const getCellData = (element) => {
  const col = element.dataset.cellId.charAt(0).charCodeAt();
  const row = Number(element.dataset.cellId.slice(1));

  return { col, row };
};

export const setCurrentFocus = () => {
  current.focus();
};

export const setCurrentText = (text) => {
  current.textContent = text;
};

export const setCurrentStyles = (styles) => {
  group.forEach((component) => {
    addCss(component, styles);
  });
};

export const getGroupIds = () => group.map((component) => component.dataset.cellId);

const cols = (element) => range(getCellData(current).col, getCellData(element).col);
const rows = (element) => range(getCellData(current).row, getCellData(element).row);

export const getCells = (element) => cols(element).reduce((acc, col) => {
  rows(element).forEach((row) => acc.push(`${String.fromCharCode(col)}${row}`));
  return acc;
}, []);

export const getNextSelector = (key) => {
  const rowMinValue = 1;

  let { row, col } = getCellData(current);

  if (['Enter', 'ArrowDown'].includes(key)) {
    row += (row < tableRows ? 1 : 0);
  } else if (['Tab', 'ArrowRight'].includes(key)) {
    col += (col < charCodes.Z ? 1 : 0);
  } else if (key === 'ArrowUp') {
    row -= (row > rowMinValue ? 1 : 0);
  } else {
    col -= (col > charCodes.A ? 1 : 0);
  }

  const nextSelector = `[data-cell-id="${String.fromCharCode(col)}${row}"]`;

  return nextSelector;
};
