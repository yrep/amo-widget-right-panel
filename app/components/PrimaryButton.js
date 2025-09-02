define([], function () {
    const PrimaryButton = ({ onClick, children, disabled = false }) => {
        const { html } = window.htmPreact;
        
        return html`
            <button 
                class="button-input button-input_blue"
                onClick=${onClick}
                disabled=${disabled}
                style=${{ marginRight: '10px' }}
            >
                ${children}
            </button>
        `;
    };
    
    return PrimaryButton;
});