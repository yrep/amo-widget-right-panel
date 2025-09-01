define([], function () {
    const Counter = ({ onIncrement }) => {
        const { html } = window.htmPreact;
        return html`
            <button onClick="${onIncrement}">
                Увеличить
            </button>
        `;
    };
    return Counter;
});