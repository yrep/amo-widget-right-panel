define([], function() {
    const Utils = {
        sayHello: function() {
            return 'Hello';
        },

        showError: function(widget_code, text) {
            const errors = APP.notifications;
            const date_now = Math.ceil(Date.now() / 1000);

            const n_data = {
                header: widget_code,
                text: '<p>' + text + '</p>',
                date: date_now
            };

            const callbacks = {
                done: function() {},
                fail: function() {},
                always: function() {}
            };

            errors.add_error(n_data, callbacks);
        },

        getAvailableSources: function(groups, selectedGroup) {
            const sources = new Set(['sms']);
            
            if (selectedGroup && groups[selectedGroup]) {
                groups[selectedGroup].forEach(vendor => {
                    if (vendor.source) {
                        sources.add(vendor.source);
                    }
                });
            }
            
            console.debug('Available sources:', Array.from(sources));
            return Array.from(sources);
        },

        formatSourceName: function(source) {
            const sourceMap = {
                'sms': 'SMS',
                'wa': 'WhatsApp',
                'tg': 'Telegram',
                'max': 'Max',
                'vb': 'Viber',
                'whatsapp': 'WhatsApp',
                'telegram': 'Telegram',
                'viber': 'Viber'
            };
            
            return sourceMap[source] || source;
        },

        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        resetFormState: function(currentState) {
            return {
                ...currentState,
                to: currentState.cardData && currentState.cardData.phones.length > 0 
                    ? currentState.cardData.phones[0].normalized 
                    : '',
                selectedPhone: currentState.cardData && currentState.cardData.phones.length > 0 
                    ? currentState.cardData.phones[0].normalized 
                    : '',
                text: '',
                selectedGroup: '',
                messageType: 'cascade',
                prioritySource: '',
                loading: false
            };
        },

        getTheme: function() {
            const htmlElement = document.documentElement;
            const colorScheme = htmlElement.getAttribute('data-color-scheme');
            return colorScheme === 'dark' ? 'dark' : 'light';
        }
    };

    return Utils;
});