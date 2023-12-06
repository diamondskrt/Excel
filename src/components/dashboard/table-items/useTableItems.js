export const createTableItems = (tableItems) => {
  if (tableItems.length) {
    return `
      <header class="dashboard__table-header">
        <div class="text-sm font-medium">Name</div>
        <div class="text-sm font-medium">Last open date</div>
      </header>
      <div class="dashboard__table-items">
        ${tableItems.map((item) => `
            <a href="#excel/${item.id}" class="dashboard__table-item">
              <div class="text-sm">${item.data.appTitle}</div>
              ${item.data.lastOpenDate && `
                <div class="flex gap-2">
                  <div class="text-sm">${new Date(item.data.lastOpenDate).toLocaleDateString('ru-RU')}</div>
                  <div class="text-sm">${new Date(item.data.lastOpenDate).toLocaleTimeString('ru-RU')}</div>
                </div>
              `}
            </a>
          `).join('')}
      </div>
    `;
  }

  return `
    <div class="text-sm">Вы еще не создали ни одной таблицы</div>
  `;
};
