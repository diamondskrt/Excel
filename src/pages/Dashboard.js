import { dom } from '@/core';
import { createElement, storage } from '@/utils';
import { createTableItems } from '@/components/dashboard/table-items';

class Dashboard {
  constructor(routeParams) {
    this.routeParams = routeParams;

    const createdComponent = dom(createElement('div', 'dashboard'));

    const tableItems = storage.getAllItems('excel').map((item) => ({
      id: item.key.replace('excel:', ''),
      ...item,
    }));

    createdComponent.el.innerHTML = `
      <header class="dashboard__header">
        <img
          src="https://www.gstatic.com/images/branding/product/1x/sheets_2020q4_48dp.png"
          srcset="https://www.gstatic.com/images/branding/product/1x/sheets_2020q4_48dp.png 1x, https://www.gstatic.com/images/branding/product/2x/sheets_2020q4_48dp.png 2x"
          alt="excel"
          aria-hidden="true"
          role="presentation"
        >
        <div class="text-lg">
          Excel Dashboard
        </div>
      </header>
      <main>
        <div class="dashboard__create-new">
          <div class="container">
            <div class="text-base">Start a new spreadsheet</div>
            <a href="#excel/${crypto.randomUUID()}">
              <img
                class="create-new-img"
                src="https://ssl.gstatic.com/docs/templates/thumbnails/sheets-blank-googlecolors.png"
                alt="sheets-blank"
              >
            </a>
          </div>
        </div>
        <div class="dashboard__table">
          <div class="container">
            ${createTableItems(tableItems)}
          </div>
        </div>
      </main>
    `;

    this.root = createdComponent.el;
  }

  getRoot() {
    return this.root;
  }
}

export const dashboard = (routeParams) => new Dashboard(routeParams);
