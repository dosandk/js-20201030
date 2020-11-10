class DefaultComponent {
  constructor() {
    this.render();
    this.initEventListeners();
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = `
      <div class="wrapper">
        <h1>Hello, Component!</h1>
      </div>
    `;

    // NOTE: в этой строке мы избавляемся от обертки-пустышки в виде `div`
    // который мы создали на строке 7
    this.element = element.firstElementChild;
  }

  initEventListeners () {
    // NOTE: в данном методе добавляем обработчики событий, если они есть
  }

  remove () {
    this.element.remove();
  }

  destroy() {
    this.remove();
    // NOTE: удаляем обработчики событий, если они есть
  }
}

const defaultComponent = new DefaultComponent();
const element = document.getElementById('root');

element.append(defaultComponent.element);
