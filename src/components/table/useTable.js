const charCodes = {
  A: 65,
  Z: 90,
};

const cols = charCodes.Z - charCodes.A + 1;

const getChar = (index) => String.fromCharCode(charCodes.A + index);

const createItem = (data, callback) => new Array(data).fill('')
  .map((_, index) => callback(index))
  .join('');

const getTh = (content) => (content
  ? `<th>${content}</th>`
  : '<th></th>');

const getTd = () => `
  <td></td>
`;

const createTd = () => createItem(cols, () => getTd());

const createTh = () => createItem(cols, (index) => getTh(getChar(index)));

const getTableBodyRow = (index) => `
  <tr>
    ${getTh(index)}
    ${createTd(cols)}
  </tr>
`;

const createTableBodyRows = (rows) => createItem(rows, (index) => getTableBodyRow(index + 1));

export const createTable = (options) => {
  const rows = options?.rows;

  const getTableHead = () => `
    <thead>
      <tr>
        ${getTh()}
        ${createTh()}
      </tr>
    </thead>
  `;

  const getTableBody = () => `
    <tbody>
      ${createTableBodyRows(rows)}
    </tbody>
  `;

  return `
    <main class="excel__table">
      <table>
        ${getTableHead()}
        ${getTableBody()}
      </table>
    </main>
  `;
};
