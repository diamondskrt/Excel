import { actions } from './constants';

export const rootReducer = (initialState, action) => {
  const state = structuredClone(initialState);

  if (action.type === actions.appTitleEdit) {
    return { ...state, appTitle: action.data };
  }

  if (action.type === actions.updateLastOpenDate) {
    return { ...state, lastOpenDate: action.data };
  }

  if (action.type === actions.tableResize) {
    const foundCell = state.thCellSizes?.find(({ id }) => id === action.data.id);

    if (foundCell) {
      foundCell.size = action.data.size;
    } else {
      state.thCellSizes.push(action.data);
    }

    return { ...state, thCellSizes: state.thCellSizes };
  }

  if (action.type === actions.cellInput) {
    const foundCell = state.thCellData?.find(({ id }) => id === action.data.id);

    if (foundCell) {
      foundCell.params = action.data.params;
    } else {
      state.thCellData.push(action.data);
    }

    return { ...state, thCellData: state.thCellData };
  }

  if (action.type === actions.toolbarBtnClick) {
    action.data.ids.forEach((id) => {
      const foundCell = state.thCellStyles?.find(({ id: cellId }) => cellId === id);

      if (foundCell) {
        foundCell.styles = { ...foundCell.styles, ...action.data.styles };
      } else {
        const data = {
          id,
          styles: action.data.styles,
        };

        state.thCellStyles.push(data);
      }
    });

    return { ...state, thCellStyles: state.thCellStyles };
  }

  return state;
};
