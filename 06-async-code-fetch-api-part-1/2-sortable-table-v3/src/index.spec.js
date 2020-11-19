import SortableTable from './index';

import data from './__mocks__/products-data';

const header = [
  {
    id: 'images',
    title: 'Image',
    sortable: false,
    template: data => {
      return `
          <div class="sortable-table__cell">
            <img class="sortable-table-image" alt="Image" src="${data[0].url}">
          </div>
        `;
    }
  },
  {
    id: 'title',
    title: 'Name',
    sortable: true,
    sortType: 'string'
  },
  {
    id: 'quantity',
    title: 'Quantity',
    sortable: true,
    sortType: 'number'
  },
  {
    id: 'price',
    title: 'Price',
    sortable: true,
    sortType: 'number'
  },
  {
    id: 'status',
    title: 'Status',
    sortable: true,
    sortType: 'number',
    template: data => {
      return `<div class="sortable-table__cell">
        ${data > 0 ? 'Active' : 'Inactive'}
      </div>`;
    }
  },
];

describe('async-code-fetch-api-part-1/sortable-table-v3', () => {
  let sortableTable;

  beforeEach(() => {
    fetchMock.resetMocks();

    sortableTable = new SortableTable(header, {
      url: 'api/rest/products'
    });

    document.body.append(sortableTable.element);
  });

  afterEach(() => {
    sortableTable.destroy();
    sortableTable = null;
  });

  it('should be rendered correctly', async() => {
    document.body.append(sortableTable.element);

    expect(sortableTable.element).toBeVisible();
    expect(sortableTable.element).toBeInTheDocument();
  });

  it('should call "loadData" method', () => {
    fetchMock.mockResponseOnce();

    expect(fetchMock.mock.calls.length).toEqual(1);
  });


  it('should render loaded data correctly', async() => {
    fetchMock.mockResponseOnce(JSON.stringify(data));

    await sortableTable.render();

    const { body } = sortableTable.subElements;

    expect(body.children.length).toEqual(3);

    const [row1, row2, row3] = body.children;

    expect(row1).toHaveTextContent('10.5\" Планшет Apple iPad Pro Wi-Fi+Cellular 64 ГБ , LTE серый');
    expect(row2).toHaveTextContent('13.3\" Рюкзак XD Design Bobby Hero Small серый');
    expect(row3).toHaveTextContent('13.3\" Ультрабук ASUS VivoBook S13 S330FA-EY127T серебристый');
  });

  it('should sort data correctly', async() => {
    fetchMock.mockResponseOnce(JSON.stringify(data));

    await sortableTable.render();

    const [_, column2] = sortableTable.subElements.header.children;
    const spy = jest.spyOn(sortableTable, 'sortOnServer');

    const click = new MouseEvent('pointerdown', {
      bubbles: true
    });


    column2.dispatchEvent(click);

    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls.length).toEqual(1);
    expect(spy.mock.calls[0][0]).toEqual('title');
    expect(spy.mock.calls[0][1]).toEqual('desc');
  });

  it('should have ability to be destroyed', () => {
    sortableTable.destroy();

    expect(sortableTable.element).not.toBeInTheDocument();
  });
});
