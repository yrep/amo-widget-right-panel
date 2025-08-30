define([], function () {
  const mount = (root) => {

    console.debug('[RightPanel] mount on root:', root);
    
    if (root) {
      let count = 0;

      const render = () => {
        root.innerHTML = `
          <div style="padding: 10px;">
            <h3 style="margin-bottom: 10px;">Заголовок окна виджета</h3>
            <div>
              <h1>Hello from widget App</h1>
              <button id="increment-button">Increment</button>
              <p>Counter: ${count}</p>
            </div>
          </div>
        `;

        document.getElementById('increment-button').onclick = () => {
          count++;
          render();
        };
      };

      render();
      console.debug('[RightPanel] отрисовано');
    } else {
      console.debug('[RightPanel] root не найден!');
    }
  };

  return {
    mount: mount,
  };
});