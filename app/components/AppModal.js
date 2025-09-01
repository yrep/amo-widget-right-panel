define([], function () {
    const AppModal = ({ content, onClose }) => {
        const { html } = window.htmPreact;
        
        return html`
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center;">
                <div style="background: white; padding: 20px; border-radius: 8px;">
                    ${content}
                    <button onClick=${onClose} style="margin-top: 10px;">Закрыть</button>
                </div>
            </div>
        `;
    };
    return AppModal;
});