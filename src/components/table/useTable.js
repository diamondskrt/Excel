const charCodes = {
  A: 65,
  Z: 90,
};

const cols = charCodes.Z - charCodes.A + 1;

const getChar = (index) => String.fromCharCode(charCodes.A + index);

const createItem = (data, callback) => new Array(data).fill('')
  .map((_, index) => callback(index))
  .join('');

const getTh = (content, thType) => (content
  ? `<th>
      <div class="table-header-cell" data-type="resizable">
        ${content}
        <div class="resizer" data-resize="${thType}" />
      </div>
    </th>`
  : '<th></th>');

const getTd = () => `
  <td contenteditable></td>
`;

const createTd = () => createItem(cols, () => getTd());

const createTh = (thType) => createItem(cols, (index) => getTh(getChar(index), thType));

const getTableBodyTr = (index) => `
  <tr>
    ${getTh(index, 'row')}
    ${createTd(cols)}
  </tr>
`;

const createTableBodyTr = (rows) => createItem(rows, (index) => getTableBodyTr(index + 1));

export const createTable = (options) => {
  const rows = options?.rows;

  const getTableHead = () => `
    <thead>
      <tr>
        ${getTh()}
        ${createTh('col')}
      </tr>
    </thead>
  `;

  const getTableBody = () => `
    <tbody>
      ${createTableBodyTr(rows)}
    </tbody>
  `;

  return `
    <table>
      ${getTableHead()}
      ${getTableBody()}
    </table>
  `;
};
