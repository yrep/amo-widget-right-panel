define([
    './components/AppForm.js',
    './modules/Utils.js',
    './modules/Api.js',
    './modules/CardParser.js'
], function (AppForm, Utils, Api, CardParser) {

    const createApp = (htmPreact) => {
        const { html, useState, useEffect } = htmPreact;

        const App = ({ widget }) => {
            const domain = widget && widget.system && widget.system().domain ? widget.system().domain : 'unknown';

            const [state, setState] = useState({
                theme: 'light',
                domain: domain
            });

            useEffect(() => {
                console.debug('Domain:', state.domain);
                console.debug(Utils.sayHello());
            }, [state.domain]);

            return html`
                <div class="${state.theme}">
                    <h3>Отправка сообщения</h3>
                    <${AppForm} widget=${widget} />
                </div>
            `;
        };

        return App;
    };

    const mount = (widget, rootElement, htmPreact) => {
        console.debug('Utils', Utils);
        console.debug('Api', Api);
        console.debug('Utils say hello', Utils.sayHello());
        const { html, render } = htmPreact;
        const App = createApp(htmPreact);
        render(html`<${App} widget=${widget} />`, rootElement);
    };

    return {
        mount: mount
    };
});