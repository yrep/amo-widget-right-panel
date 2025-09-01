define([
    './components/Title.js',
    './components/Counter.js',
    './components/AppModal.js',
    './components/AppForm.js',
    './modules/Utils.js'
], function (Title, Counter, AppModal, AppForm, Utils) {

    const createApp = (htmPreact) => {
        const { html, useState, useEffect } = htmPreact;

        const App = ({ widget }) => {
            const domain = widget && widget.system && widget.system().domain ? widget.system().domain : 'unknown';

            const [state, setState] = useState({
                theme: 'light',
                domain: domain,
                count: 0,
                showModal: false
            });

            useEffect(() => {
                console.debug('Domain:', state.domain);
                console.debug(Utils.sayHello());
            }, [state.domain]);

            const increment = () => {
                setState({ ...state, count: state.count + 1 });
            };

            const toggleModal = () => {
                setState({ ...state, showModal: !state.showModal });
            };

            const handleFormSubmit = (e) => {
                e.preventDefault();
                console.debug('Form submitted');
                toggleModal();
            };

            const formFields = [
                { label: 'Имя', type: 'text', name: 'name' },
                { label: 'Email', type: 'email', name: 'email' }
            ];

            const modalContent = html`
                <div>
                    <h3>Модальное окно</h3>
                    <${AppForm}
                        fields=${formFields}
                        onSubmit=${handleFormSubmit}
                    />
                </div>
            `;

            return html`
                <div class="${state.theme}">
                    <${Title} count=${state.count} />
                    <${Counter} onIncrement=${increment} />
                    <button onClick=${toggleModal}>
                        Открыть модалку
                    </button>
                    ${state.showModal ? html`
                        <${AppModal}
                            content=${modalContent}
                            onClose=${toggleModal}
                        />
                    ` : null}
                </div>
            `;
        };

        return App;
    };

    const mount = (widget, rootElement, htmPreact) => {
        console.debug('Title', Title);
        console.debug('Utils', Utils);
        console.debug('Utils say hello', Utils.sayHello());
        const { html, render } = htmPreact;
        const App = createApp(htmPreact);
        render(html`<${App} widget=${widget} />`, rootElement);
    };

    return {
        mount: mount
    };
});