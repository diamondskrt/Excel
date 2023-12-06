import { objectStylesToString } from '@/utils';

export const charCodes = {
  A: 65,
  Z: 90,
};

export const tableRows = 100;

const cols = charCodes.Z - charCodes.A + 1;

const getChar = (index) => String.fromCharCode(charCodes.A + index);

const getCellSize = (params) => {
  const { state, thType, content } = params;

  const foundCell = state?.thCellSizes?.find(({ id }) => id === String(content));

  const size = foundCell && (thType === 'col' ? `width: ${foundCell.size}` : `height: ${foundCell.size}`);

  return size;
};

const getContent = (id, state) => {
  const foundCell = state?.thCellData?.find(({ id: cellId }) => cellId === id);

  return foundCell?.params;
};

const getStyles = (id, state) => {
  const foundCell = state?.thCellStyles?.find(({ id: cellId }) => cellId === id);
  return foundCell ? objectStylesToString(foundCell.styles) : null;
};

const createItem = (data, callback) => new Array(data).fill('')
  .map((_, index) => callback(index))
  .join('');

const getTh = (params = {}) => {
  const { content, thType, state } = params;
  const size = getCellSize({ state, thType, content });

  return content
    ? `<th>
        <div class="table-header-cell" data-type="resizable" ${size && `style="${size}"`}>
          ${content}
          <div class="resizer" data-resize="${thType}" />
        </div>
      </th>`
    : '<th></th>';
};

const getTd = (params) => {
  const { id, state } = params;
  const cellParams = getContent(id, state);
  const styles = getStyles(id, state);

  return `<td contenteditable data-cell-id="${id}" ${styles && `style="${styles}"`}>${cellParams?.text || ''}</td>`;
};

const createTd = (rowIndex, state) => createItem(cols, (index) => getTd({
  id: `${getChar(index)}${rowIndex}`,
  state,
}));

const createTh = (
  thType,
  state,
) => createItem(cols, (index) => getTh({ content: getChar(index), thType, state }));

const getTableBodyTr = (index, state) => `
  <tr>
    ${getTh({ content: index, thType: 'row', state })}
    ${createTd(index, state)}
  </tr>
`;

const createTableBodyTr = (
  rows,
  state,
) => createItem(rows, (index) => getTableBodyTr(index + 1, state));

export const createTable = (state) => {
  const getTableHead = () => `
    <thead>
      <tr>
        ${getTh()}
        ${createTh('col', state)}
      </tr>
    </thead>
  `;

  const getTableBody = () => `
    <tbody>
      ${createTableBodyTr(tableRows, state)}
    </tbody>
  `;

  return `
    <table>
      ${getTableHead()}
      ${getTableBody()}
    </table>
  `;
};
