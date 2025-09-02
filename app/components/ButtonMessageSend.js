define([], function() {
    const ButtonMessageSend = ({ onClick, disabled }) => {
        const { html } = window.htmPreact;

        return html`
            <button onClick=${onClick} disabled=${disabled}>
                Отправить сообщение
            </button>
        `;
    };

    return ButtonMessageSend;
});