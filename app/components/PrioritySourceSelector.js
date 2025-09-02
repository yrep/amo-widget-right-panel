define([], function() {
    const PrioritySourceSelector = ({ prioritySource, availableSources, onPrioritySourceChange }) => {
        const { html } = window.htmPreact;

        return html`
            <select value=${prioritySource} onChange=${onPrioritySourceChange}>
                <option value="">Выберите источник</option>
                ${availableSources.map(source => html`
                    <option value=${source}>${source}</option>
                `)}
            </select>
        `;
    };

    return PrioritySourceSelector;
});