define([], function() {
    const MessageTypeSelector = ({ messageType, onMessageTypeChange }) => {
        const { html } = window.htmPreact;

        return html`
            <select value=${messageType} onChange=${onMessageTypeChange}>
                <option value="cascade">Каскад</option>
                <option value="priority_source">Приоритетный источник</option>
            </select>
        `;
    };

    return MessageTypeSelector;
});