define([], function () {
  return {
    mount: function (selector, preact, htm, signals) {
      console.debug('[RightPanel] mount на селектор:', selector);

      const { h, render } = preact;
      const html = htm.bind(h);

      function RightPanelTitle() {
        return html`<h3 style="margin-bottom: 10px;">Заголовок окна виджета</h3>`;
      }

      function RightPanelForm() {
        return html`
          <div>
            <input
              type="text"
              placeholder="Введите текст..."
              style="width: 100%; padding: 6px; margin-bottom: 8px;"
            />
            <select style="width: 100%; padding: 6px;">
              <option value="1">Пункт 1</option>
              <option value="2">Пункт 2</option>
              <option value="3">Пункт 3</option>
            </select>
          </div>
        `;
      }

      function App() {
        return html`
          <div style="padding: 10px;">
            <${RightPanelTitle} />
            <${RightPanelForm} />
          </div>
        `;
      }

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
