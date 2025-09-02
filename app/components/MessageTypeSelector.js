define([], function () {
    const MessageTypeSelector = ({ messageType, onMessageTypeChange, disabled }) => {
        const { html } = window.htmPreact;
        
        return html`
            <select 
                value=${messageType} 
                onChange=${onMessageTypeChange}
                class="control--select--button"
                disabled=${disabled}
                style=${{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
            >
                <option value="cascade">Каскадная отправка</option>
                <option value="priority_source">Приоритетный источник</option>
            </select>
        `;
    };
    
    return MessageTypeSelector;
});