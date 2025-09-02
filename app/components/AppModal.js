define([
    './PrimaryButton.js',
    './StandardButton.js'
], function (PrimaryButton, StandardButton) {
    const AppModal = ({ onClose, status, onReset, onRetry }) => {
        const { html } = window.htmPreact;
        
        const getContent = () => {
            if (status === 'success') {
                return html`
                    <div>
                        <div>Сообщение отправлено</div>
                        <div style="font-size: 12px; color: #666; margin-top: 5px;">
                            Отправка сообщения в каскад не гарантирует доставку. Для успешной отправки должны быть оплачены соответствующие каналы.
                        </div>
                        <div style="margin-top: 15px;">
                            <${StandardButton} onClick=${onReset}>
                                Очистить форму
                            <//>
                            <${PrimaryButton} onClick=${onClose}>
                                Закрыть
                            <//>
                        </div>
                    </div>
                `;
            } else {
                return html`
                    <div>
                        <div>Не получилось отправить сообщение. Попробуйте еще раз.</div>
                        <div style="margin-top: 15px;">
                            <${StandardButton} onClick=${onReset}>
                                Очистить форму
                            <//>
                            <${StandardButton} onClick=${onRetry}>
                                Еще одна попытка
                            <//>
                            <${PrimaryButton} onClick=${onClose}>
                                Закрыть
                            <//>
                        </div>
                    </div>
                `;
            }
        };

        return html`
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;">
                <div style="background: white; padding: 20px; border-radius: 8px; min-width: 300px;">
                    ${getContent()}
                </div>
            </div>
        `;
    };
    return AppModal;
});