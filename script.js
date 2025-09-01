define([
  "./lib/standalone.umd.min.js",
  "./app/RightPanelApp.js"
], function (htmPreact, RightPanelApp) {
  return function () {
    const widget = this;
    window.htmPreact = htmPreact;
    const version = 3;

    console.debug('Version', version);

    const utils = {
    };


    this.callbacks = {
      settings: function () {
        console.debug('[Widget] settings');
        return true;
      },

      render: function () {
        console.debug('[Widget] render');
        console.debug('htmPreact');
        console.debug(htmPreact);
        if (APP.isCard()){
          console.debug('Card area');
          widget.render_template({
            caption: { class_name: 'qwerty-widget-caption' },
            body: '<div id="right-panel-app"></div>',
            render: ''
          });
          var mountPoint = document.querySelector("#right-panel-app");
          console.debug('Mount point', mountPoint);
          if(mountPoint){
            console.debug('Mounting app');
            console.debug('App object', RightPanelApp);
            try{
              RightPanelApp.mount(widget, mountPoint, htmPreact);
            } catch (error) {
              console.debug('App object', error);
            }
            return true;
          } else {
            console.debug('Mount point not found');
            var error = {
              header: "Ошибка отображения виджета",
              text: "Не найден элемент для отображения интерфейса, попробуйте перезагрузить страницу"
            };
            APP.notifications.show_message_error(error);
            return false;
          }
        }
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

      loadPreloadedData: function () {
        console.debug('[Widget] loadPreloadedData');
      },

      loadElements: function (type, id) {
        console.debug('[Widget] loadElements', { type, id });
      },

      linkCard: function (links) {
        console.debug('[Widget] linkCard', links);
      },

      searchDataInCard: function (query, type, id) {
        console.debug('[Widget] searchDataInCard', { query, type, id });
      }
    };

    return this;
  };
});
