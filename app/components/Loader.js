define([], function () {
    const Loader = ({ isLoading, text = 'Загрузка...' }) => {
        const { html } = window.htmPreact;
        
        if (!isLoading) return null;
        
        return html`
            <div style=${{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}>
                <div style=${{marginRight: '10px'}}>⏳</div>
                <div>${text}</div>
            </div>
        `;
    };
    
    return Loader;
});