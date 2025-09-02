define([
    './components/AppForm.js',
    './modules/Utils.js',
    './modules/Api.js',
    './modules/CardParser.js',
    './modules/Validator.js'
], function (AppForm, Utils, Api, CardParser, Validator) {

    const createApp = (htmPreact) => {
        const { html, useState, useEffect } = htmPreact;

        const App = ({ widget }) => {
            const domain = widget && widget.system && widget.system().domain ? widget.system().domain : 'unknown';
            const theme = Utils.getTheme();

            useEffect(() => {
                console.debug('Domain:', domain);
                console.debug('Theme:', theme);
            }, [domain]);

            return html`
                <div class="${theme}">
                    <h3>Отправка сообщения</h3>
                    <${AppForm} widget=${widget} theme=${theme} />
                </div>
            `;
        };

        return App;
    };

    const mount = (widget, rootElement, htmPreact) => {
        console.debug('Mounting widget...');
        const { html, render } = htmPreact;
        const App = createApp(htmPreact);
        render(html`<${App} widget=${widget} />`, rootElement);
        console.debug('Widget mounted successfully');
    };

    return {
        mount: mount
    };
});