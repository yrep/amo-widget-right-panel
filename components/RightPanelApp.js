define([
  './../lib/preact.min.js',
  './../lib/htm.min.js'
], function (preact, htm) {
  const h = preact.h;
  const render = preact.render;
  const html = htm.bind(h);

  const RightPanelTitle = () => {
    return html`<h3 style="margin-bottom: 10px;">Заголовок окна виджета</h3>`;
  };

  class Counter extends preact.Component {
    constructor(props) {
      super(props);
      this.state = { count: 0 };
      this.onButtonClick = this.onButtonClick.bind(this);
    }
    onButtonClick() {
      this.setState({ count: this.state.count + 1 });
    }
    render() {
      return html`
        <div>
          <h1>Hello from widget App</h1>
          <button onClick=${this.onButtonClick}>
            Increment
          </button>
          <p>Counter: ${this.state.count}</p>
        </div>
      `;
    }
  }

  const App = () => {
    return html`
      <div style="padding: 10px;">
        <${RightPanelTitle} />
        <${Counter} />
      </div>
    `;
  };

  return {
    mount: (selector) => {
      console.debug('[RightPanel] mount на селектор:', selector);
      const root = document.querySelector(selector);
      if (root) {
        render(html`<${App} />`, root);
        console.debug('[RightPanel] отрисовано');
      } else {
        console.debug('[RightPanel] root не найден!');
      }
    }
  };
});