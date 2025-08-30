define([], function () {
  return function () {
    var self = this;

    this.callbacks = {
      settings: function () {
        console.debug('[Widget] settings');
        return true;
      },

      render: function () {
        console.debug('[Widget] render');

        self.render_template({
          caption: { class_name: 'qwerty-widget-caption' },
          body: '<div id="preact-root">Заглушка виджета</div>',
          render: ''
        });

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
