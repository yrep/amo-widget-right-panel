define([
  "./lib/preact.min.js",
  "./lib/htm.min.js",
  "./lib/signals.min.js",
  "./components/RightPanelApp.js"
], function (preact, htm, signals, RightPanelApp) {
  return function () {
    var self = this;

    this.callbacks = {
      settings: function () {
        console.debug('[Widget] settings');
        return true;
      },

      init: function () {
        console.debug('[Widget] init');
        return true;
      },

      bind_actions: function () {
        console.debug('[Widget] bind_actions');
        return true;
      },

      dpSettings: function () {
        console.debug('[Widget] dpSettings');
        return true;
      },

      advancedSettings: function () {
        console.debug('[Widget] advancedSettings');
        return true;
      },

      destroy: function () {
        console.debug('[Widget] destroy');
        return true;
      },

      onSave: function () {
        console.debug('[Widget] onSave');
        return true;
      },

      onAddAsSource: function (pipeline_id) {
        console.debug('[Widget] onAddAsSource', pipeline_id);
        return true;
      },

      onSalesbotDesignerSave: function (handler_code, params) {
        console.debug('[Widget] onSalesbotDesignerSave', { handler_code, params });
        return true;
      },

      leads: {
        selected: function () {
          console.debug('[Widget] leads.selected');
          return true;
        }
      },

      contacts: {
        selected: function () {
          console.debug('[Widget] contacts.selected');
          return true;
        }
      },

      todo: {
        selected: function () {
          console.debug('[Widget] todo.selected');
          return true;
        }
      },

      render: function () {
        console.debug('[Widget] render');

        // card area
        if (APP.isCard()){
          console.debug('Card area');
          self.render_template({
            caption: { class_name: 'qwerty-widget-caption' },
            body: '<div id="right-panel-app"></div>',
            render: ''
          });
  
          mountPoint = document.querySelector("#right-panel-app");
          console.debug('Mount point', mountPoint);
          if(mountPoint){
            console.debug('Mounting app');
            RightPanelApp.mount(mountPoint, preact, htm, signals);
            return true;
          } else {
            console.debug('Mount point not found');
            const error = {
                header: "Ошибка отображения виджета",
                text: "Не найден элемент для отображения интерфейса, попробуйте перезагрузить страницу"
            };
            APP.notifications.show_message_error(error);
            return false;
          }
        }

        // rest areas
        return true;

      },

      loadPreloadedData: function () {
        // console.debug('[Widget] loadPreloadedData');
        // return Promise.resolve([
        //   { id: 1, sku: 'SKU001', name: 'Товар 1', price: '100' },
        //   { id: 2, sku: 'SKU002', name: 'Товар 2', price: '200' },
        //   { id: 3, sku: 'SKU003', name: 'Товар 3', price: '300' }
        // ]);
      },

      loadElements: function (type, id) {
        // console.debug('[Widget] loadElements', { type, id });
        // return Promise.resolve([
        //   { id: 1, sku: 'SKU001', name: 'Товар 1', price: '100', quantity: 1 }
        // ]);
      },

      linkCard: function (links) {
        console.debug('[Widget] linkCard', links);
        return Promise.resolve();
      },

      searchDataInCard: function (query, type, id) {
        // console.debug('[Widget] searchDataInCard', { query, type, id });
        // const data = [
        //   { id: 1, sku: 'SKU001', name: 'Товар 1', price: '100' },
        //   { id: 2, sku: 'SKU002', name: 'Товар 2', price: '200' },
        //   { id: 3, sku: 'SKU003', name: 'Товар 3', price: '300' }
        // ];
        // return Promise.resolve(
        //   data.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
        // );
      }
    };

    return this;
  };
});
