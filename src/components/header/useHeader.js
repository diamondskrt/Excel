import { createAppBar } from './useAppBar';
import { createToolbar } from './useToolbar';
import { createFormula } from './useFormula';

export const createHeader = (state, globalState) => {
  const { toolbar, formula } = state;

  return `
    ${createAppBar(globalState)}
    ${createToolbar(toolbar)}
    ${createFormula(formula)}
  `;
};
