define([
  "./config.js",
  "./lib/standalone.umd.min.js",
  "./app/RightPanelApp.js"
], function (config, htmPreact, RightPanelApp) {

  // constants
  // TODO to config
  // const config.WIDGET_NAME = 'Integrilla';
  // const config.IFRAME_URL = 'https://home-dev.touch-api.com/widget';
  // const config.WIDGET_SETTINGS_URL = 'https://amocrm.apitter.com/widget/settings/';
  // const config.WIDGET_AUTH_URL = 'https://amocrm.apitter.com/widget/auth/';
  // const config.GROUPS_URL = 'https://time.developtech.ru/api/v1/message/groups';

  return function IntegrillaWidget() {
    const widget = this;
    window.htmPreact = htmPreact;
    const version = 3;

    console.debug('Version', version);

    const apps = {
      
      runApp: function() {
        console.debug('Checking if in card area...');
        if (APP.isCard()){
            console.debug('Running right panel app...');
            apps.rightPanelApp();
        } else {
            console.debug('Not in card area, skipping app start');
        }
      },
      
      rightPanelApp() {
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
            console.debug('App mount error:', error);
            const errorNotification = {
                header: "Ошибка запуска виджета",
                text: "Не удалось запустить интерфейс виджета: " + error.message
            };
            APP.notifications.show_message_error(errorNotification);
            return false;
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
    }

    // custom methods
    const utils = {
      loadTemplate: (filename) => {
        const path = widget.params.path;
        if (!path) {
          console.debug('Template path not found');
          return Promise.reject('No template path');
        }

        const url = `${path}/templates/${filename}`;

        return fetch(url)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Template not found: ${url}`);
            }
            return response.text();
          })
          .catch(error => {
            console.debug('Failed to load template:', error);
            return 'error';
          });
      },

      getContainer: (widgetCode) => {
        try {
          let container = document.querySelector(`#work-area-${widgetCode}`);
          if (!container) {
            container = document.createElement('div');
            container.className = 'advanced-settings-container';
            document.body.appendChild(container);
          }
          return container;
        } catch (error) {
          console.debug(`utils.getContainer: ${error.message}`);
          return null;
        }
      },

      showError: (container, message) => {
        try {
          container.innerHTML = `
            <div class="error-message">
              <p>${message}</p>
            </div>
          `;
        } catch (error) {
          console.debug(`utils.showError: ${error.message}`);
        }
      },

      renderTemplate: (template, data) => {
        try {
          return new Function(...Object.keys(data), `return \`${template}\`;`)(...Object.values(data));
        } catch (error) {
          console.debug(`utils.renderTemplate: ${error.message}`);
          return '';
        }
      },

      fetchAdvancedData: (apiKey, userId, widgetCode, callback) => {
        try {
          console.debug('Sending request with (' + config.WIDGET_SETTINGS_URL + '):', {
            apiKey, userId, widgetCode
          });

          widget.crm_post(
            config.WIDGET_SETTINGS_URL,
            { amouser_id: userId },
            ({ name = '', phone = '' }) => callback(name, phone),
            'json',
            () => {
              const timestamp = Math.ceil(Date.now() / 1000);
              APP.notifications.add_error({
                header: widgetCode || 'unknown_widget',
                text: '<p>Failed to load advanced data from server.</p>',
                date: timestamp,
              });
              callback('', '');
            },
            { headers: { 'X-Api-Key': apiKey } }
          );
        } catch (error) {
          console.debug(`utils.fetchAdvancedData: ${error.message}`);
        }
      },

      renderForm: (container, nameVal, phoneVal, userId, apiKey, widgetCode) => {
        utils.loadTemplate('adv_settings_form.html')
          .then(template => {
            if (template === 'error') {
              console.debug('Advanced settings form template is missing or failed to load');
              return;
            }

            const html = utils.renderTemplate(template, {
              name: nameVal,
              phone: phoneVal,
              userId,
            });

            container.innerHTML = html;

            const form = document.getElementById('advanced-form');
            if (!form) {
              console.debug('utils.renderForm: Form not found');
              return;
            }

            form.addEventListener('submit', event => {
              event.preventDefault();
              const data = {
                name: form.name.value,
                phone: form.phone.value,
                user: form.user.value,
              };
              utils.submitFormData(data, apiKey, widgetCode);
            });
          })
          .catch(error => {
            console.debug(`utils.renderForm: ${error.message}`);
            utils.showError(container, 'Failed to render form');
          });
      },


      submitFormData: (data, apiKey, widgetCode) => {
        try {
          widget.crm_post(
            config.WIDGET_SETTINGS_URL,
            data,
            () => {
              const timestamp = Math.ceil(Date.now() / 1000);
              APP.notifications.show_notification({
                header: widgetCode || 'unknown_widget',
                text: '<p>Data saved successfully.</p>',
                date: timestamp,
              });
            },
            'json',
            () => {
              const timestamp = Math.ceil(Date.now() / 1000);
              APP.notifications.add_error({
                header: widgetCode || 'unknown_widget',
                text: '<p>Failed to save advanced data.</p>',
                date: timestamp,
              });
            },
            { headers: { 'X-Api-Key': apiKey } }
          );
        } catch (error) {
          console.debug(`utils.submitFormData: ${error.message}`);
        }
      },

      getWidgetInfo: () => {
        const systemData = widget.system();
        const settings = widget.get_settings();

        const info = {};

        if (systemData && settings) {
          info.amouser = systemData.amouser;
          info.amouser_id = systemData.amouser_id;
          info.area = systemData.area;
          info.domain = systemData.domain;
          info.widget_code = settings.widget_code;
        }

        return info;
      },

      buildUrl: () => {
        const settings = widget.get_settings();
        const systemData = widget.system();

        if(settings && settings['authorized'] && settings['widget_data']){
          const params = new URLSearchParams({
          data: settings.widget_data
          });
          return `${config.IFRAME_URL}?${params.toString()}`
        } else {
          console.debug('no data in settings');
          const params = new URLSearchParams({
            error: 'unauthorized',
            domain: systemData.domain
          });
          return `${config.IFRAME_URL}?${params.toString()}`;
        }
      },
    };


    this.callbacks = {
      settings: () => {
        try {
          const widgetCode = widget.get_settings().widget_code || 'integrilla';
          const customDiv = document.getElementById(`${widgetCode}_custom_content`);
          if (!customDiv) {
            console.debug('settings: Custom div not found');
            return true;
          }

          const parentField = customDiv.closest('.widget_settings_block__item_field');
          if (parentField) parentField.style.display = 'none';

          return true;
        } catch (error) {
          console.debug(`settings: ${error.message}`);
          return true;
        }
      },

      render: () => {
        try {
          console.debug('render');
          const settings = widget.get_settings();
          const widgetInfo = utils.getWidgetInfo();


          if(settings && settings.authorized){
            console.debug('already authorized');
            apps.runApp();
            return true;
          }

          widget.$authorizedAjax({
            url: config.WIDGET_AUTH_URL,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(widgetInfo)
          })
          .done(function (response) {

            let responseObject;
            try {
              responseObject = JSON.parse(response);
            } catch(e) {
              console.debug('Ошибка парсинга JSON:', e);
              APP.notifications.add_error({
                header: 'Ошибка валидации виджета',
                text: '<p>Некорректный ответ сервера</p>',
                date: Math.floor(Date.now() / 1000),
              });
              return true;
            }

            if (responseObject && responseObject.data) {
              widget.set_settings({ authorized: true });
              widget.set_settings({ widget_data: responseObject.data});
              console.debug('data saved in settings');
            } else {
              const timestamp = Math.floor(Date.now() / 1000);
              console.debug('no data found');
              APP.notifications.add_error({
                header: 'Ошибка валидации виджета',
                text: '<p>Сервер не смог подтвердить подлинность виджета</p>',
                date: timestamp,
              });
            }
            apps.runApp();
            return true;
          })
          .fail(function (err) {
            console.debug('error', err);
            const timestamp = Math.floor(Date.now() / 1000);
            APP.notifications.add_error({
              header: 'Ошибка подключения к серверу',
              text: '<p>Не удалось связаться с сервером валидации</p>',
              date: timestamp,
            });
            return true;
          });

        } catch (error) {
          console.debug(`render error: ${error.message}`);
          const timestamp = Math.floor(Date.now() / 1000);
          APP.notifications.add_error({
            header: `Ошибка загрузки виджета ${config.WIDGET_NAME}`,
            text: `Виджет не может быть загружен`,
            date: timestamp,
          });
          return true;
        }
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

      advancedSettings: () => {
          try {
              let tries = 0;

              const checkAuthStatus = () => {
                  const settings = widget.get_settings();
                  const authorized = settings.authorized;
                  return authorized;
              };

              const initializeWidget = () => {
                  const settings = widget.get_settings();
                  const widgetCode = settings.widget_code;
                  if (!widgetCode) {
                      console.debug('advancedSettings: widget_code is undefined');
                      return;
                  }

                  const container = utils.getContainer(widgetCode);
                  if (!container) {
                      console.debug('advancedSettings: Container not found');
                      return;
                  }

                  container.innerHTML = '';

                  const url = utils.buildUrl();

                  const iframe = document.createElement('iframe');
                  Object.assign(iframe, {
                      src: url,
                      scrolling: 'no',
                  });
                  iframe.style.cssText = 'width: 100%; height: 1280px; border: none; overflow: hidden;';

                  container.appendChild(iframe);

                  widget.callbacks.destroy = () => {
                      try {
                          window.removeEventListener('resize', setIframeHeight);
                          window.removeEventListener('message', handleIframeHeight);
                          console.debug('destroy: Removed event listeners');
                      } catch (error) {
                          console.debug(`destroy: ${error.message}`);
                      }
                  };
              };

              if (checkAuthStatus()) {
                  initializeWidget();
              } else {
                  const authCheckInterval = setInterval(() => {
                      tries++;
                      if (checkAuthStatus()) {
                          clearInterval(authCheckInterval);
                          initializeWidget();
                      } else if (tries > 30) {
                          clearInterval(authCheckInterval);
                          APP.notifications.add_error({
                              header: 'Ошибка отображения',
                              text: '<p>Не удалось отобразить окно виджета</p>',
                              date: Math.floor(Date.now() / 1000),
                          });
                      }
                  }, 100);
              }

          } catch (error) {
              console.debug(`advancedSettings: ${error.message}`);
          }
      },

      initMenuPage: ({ location, item_code }) => {
          try {

              let tries = 0;

              if (location !== 'widget_page' || item_code !== 'integrilla_main') return;

              const checkAuthStatus = () => {
                  const settings = widget.get_settings();
                  const authorized = settings.authorized;
                  return authorized;
              };

              const initializeWidget = () => {
                  const settings = widget.get_settings();
                  const widgetCode = settings.widget_code;
                  if (!widgetCode) {
                      console.debug('initMenuPage: widget_code is undefined');
                      return;
                  }

                  const container = utils.getContainer(widgetCode);
                  if (!container) {
                      console.debug('initMenuPage: Container not found');
                      return;
                  }

                  container.innerHTML = '';

                  const url = utils.buildUrl();

                  const iframe = document.createElement('iframe');
                  Object.assign(iframe, {
                      src: url,
                      scrolling: 'no',
                  });
                  iframe.style.cssText = 'width: 100%; height: 1280px; border: none; overflow: hidden;';

                  container.appendChild(iframe);

                  widget.callbacks.destroy = () => {
                      try {
                          window.removeEventListener('resize', setIframeHeight);
                          window.removeEventListener('message', handleIframeHeight);
                          console.debug('destroy: Removed event listeners');
                      } catch (error) {
                          console.debug(`destroy: ${error.message}`);
                      }
                  };
              };

              if (checkAuthStatus()) {
                  initializeWidget();
              } else {
                  const authCheckInterval = setInterval(() => {
                      if (checkAuthStatus()) {
                          clearInterval(authCheckInterval);
                          initializeWidget();
                      } else if (tries > 30){
                        clearInterval(authCheckInterval);
                        APP.notifications.add_error({
                          header: 'Ошибка отображения',
                          text: '<p>Не удалось отобразить окно виджета</p>',
                          date: Math.floor(Date.now() / 1000),
                        });
                      }
                  }, 100);
              }

          } catch (error) {
              console.debug(`initMenuPage: ${error.message}`);
          }
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
