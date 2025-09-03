define([], function() {
    const Validator = {

        validateMessageForm: function(formData, state, showError) {
            const { to, text, selectedGroup, messageType, prioritySource, isParsingCard, requestData } = state;
            
            if (isParsingCard) {
                showError(requestData.widget_code, 'Данные карточки еще загружаются');
                return false;
            }
            
            if (!to || !text || !selectedGroup) {
                console.debug('Validation failed: missing required fields');
                showError(requestData.widget_code, 'Заполните все обязательные поля');
                return false;
            }
            
            if (messageType === 'priority_source' && !prioritySource) {
                console.debug('Validation failed: priority source required');
                showError(requestData.widget_code, 'Выберите приоритетный источник');
                return false;
            }
            
            console.debug('Validation passed');
            return true;
        },

        validatePhone: function(phone) {
            if (!phone) return false;
            const normalized = phone.replace(/\D/g, '');
            return normalized.length >= 10;
        },

        validateMessageText: function(text) {
            return text && text.trim().length > 0;
        }
    };

    return Validator;
});