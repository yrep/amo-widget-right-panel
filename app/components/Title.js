define([], function () {
    const Title = ({ count }) => {
        const { html } = window.htmPreact;
        return html`
            <h2>Счетчик: ${count}</h2>
        `;
    };
    return Title;
});