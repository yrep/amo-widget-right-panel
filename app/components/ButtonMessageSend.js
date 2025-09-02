define([], function () {
    const ButtonMessageSend = ({ onClick, disabled, loading }) => {
        const { html } = window.htmPreact;
        
        const textColor = `palette-text-primary`;
        //const backgroundColor = disabled ? '#ccc' : '#007bff';
        
        return html`
            <button
                type="button"
                onClick=${onClick}
                disabled=${disabled}
                class="button-input button-input_blue"
                style=${{
                    padding: '10px 20px',
                    //backgroundColor: backgroundColor,
                    color: textColor,
                    border: 'none',
                    borderRadius: '4px',
                    cursor: disabled ? 'not-allowed' : 'pointer'
                }}
            >
                ${loading ? 'Отправка...' : 'Отправить сообщение'}
            </button>
        `;
    };
    
    return ButtonMessageSend;
});
