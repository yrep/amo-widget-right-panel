define(['../modules/Utils.js'], function (Utils) {
    const PrioritySourceSelector = ({ prioritySource, availableSources, onPrioritySourceChange, disabled }) => {
        const { html } = window.htmPreact;
        
        return html`
            <select 
                value=${prioritySource} 
                onChange=${onPrioritySourceChange}
                class="control--select--button"
                disabled=${disabled}
                style=${{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
            >
                <option value="">Выберите источник</option>
                ${availableSources.map(source => html`
                    <option value=${source}>
                        ${Utils.formatSourceName(source)}
                    </option>
                `)}
            </select>
        `;
    };
    
    return PrioritySourceSelector;
});