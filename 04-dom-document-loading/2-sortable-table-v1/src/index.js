export default class SortableTable {
  element;
  subElements = {};

  constructor(header = [], data = {}) {
    this.header = header;
    this.data = data.data;
    this.render();
  }

  render() {
    const el = document.createElement('div');
    el.innerHTML = this.template();

    this.element = el.firstElementChild;
    this.subElements = this.getSubElements(this.element);
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((acc, item) => {
      acc[item.dataset.element] = item;
      return acc;
    }, {});
  }

  template() {
    return `
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">
          <div data-element="header" class="sortable-table__header sortable-table__row">
            ${this.getHeader(this.header)}
          </div>
          <div data-element="body" class="sortable-table__body">
            ${this.getTable(this.data)}
          </div>
        </div>
      </div>
    `;
  }

  getHeader (arr, field = 'title', order = '') {
    return arr.map(({title, id, sortable}) => {
      return ` 
        <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="${field === id ? order : ''}">
          <span>${title} ${field === id ? order : ''}</span>
           <span class="sortable-table__sort-arrow">
            <span class="sort-arrow"/>
          </span>
        </div>`;
    }).join('');
  }

  getTable (products) {
    const table = [];
    for (let product of products){
      table.push(this.getTableRow(product));
    }

    // console.error('table', table);

    return table.join('');
  }

  getTableRow ({title = '', images = [], quantity = 0, price = 0, sales = 0} = {}) {
    const image = (images.length > 0) ? `<img class="sortable-table-image" alt="Image" src="${images[0].url}">` : '';
    return `
      <a href="/products/3d-ochki-epson-elpgs03" class="sortable-table__row">
        <div class="sortable-table__cell">${image}</div>
        <div class="sortable-table__cell">${title}</div>
        <div class="sortable-table__cell">${quantity}</div>
        <div class="sortable-table__cell">${price}</div>
        <div class="sortable-table__cell">${sales}</div>
      </a>`;
  }

  sort(field = 'title', order = 'asc') {
    const sortTable = [...this.data];
    const currentHeaderItem = this.header.find(item => item.id === field);
    const sortType = currentHeaderItem ? currentHeaderItem.sortType : '';

    // let res = 0;

    sortTable.sort((item1, item2) => {
      const a = item1[field];
      const b = item2[field];
      const c = (order === 'desc') ? -1 : 1;

      switch (sortType) {
        case 'number':
          return c * (a - b);
          // break;
        case 'string':
          return c * a.localeCompare(b, ['ru', 'en'], {caseFirst: 'upper'});
          // break;
        default:
          console.error(1111);
          break;
      }
      // return res;
    });

    // console.error('sortTable', sortTable);

    //this.subElements.header.innerHtml = this.getHeader(this.header, field, order);
    this.subElements.body.innerHTML = this.getTable(sortTable);
  }

  remove () {
    this.element.remove();
  }

  destroy() {
    this.remove();
    // additionally needed to remove all listeners...
  }
}
