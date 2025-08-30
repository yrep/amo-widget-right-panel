define([
    './../lib/preact.umd.js'
], function (preact) {

    console.debug('Preact is loaded:', preact);

    const { h, render } = preact;

    const App = () => {
        return h('div', null, 'Preact');
    };

    const mount = (rootElement) => {
        if (rootElement) {
            render(h(App), rootElement);
        }
    };

    return {
        mount: mount,
    };
});
