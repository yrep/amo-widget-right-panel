define([], function () {
    const StandardButton = ({ onClick, children, disabled = false }) => {
        const { html } = window.htmPreact;
        
        return html`
            <button 
                class="button-input"
                onClick=${onClick}
                disabled=${disabled}
                style=${{ marginRight: '10px' }}
            >
                ${children}
            </button>
        `;
    };
    
    return StandardButton;
});