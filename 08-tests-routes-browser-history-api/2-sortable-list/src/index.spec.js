import SortableList from './index.js';

describe('tests-for-frontend-apps/sortable-list', () => {
  let sortableList;
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  beforeEach(() => {
    sortableList = new SortableList({
      items: data.map(item => {
        const element = document.createElement('li');

        element.append(item);

        return element;
      })
    });

    document.body.append(sortableList.element);
  });

  afterEach(() => {
    sortableList.destroy();
    sortableList = null;
  });

  it('should be rendered correctly', () => {
    expect(sortableList.element).toBeVisible();
    expect(sortableList.element).toBeInTheDocument();
  });

  it('should have ability to be removed', () => {
    sortableList.remove();

    expect(sortableList.element).not.toBeInTheDocument();
  });
});
