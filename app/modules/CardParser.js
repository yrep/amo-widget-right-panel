define([], function() {
    const CardParser = {

        getCardData: function() {
            const name = this.getName();
            const phones = this.getPhones();
            
            return {
                name: name,
                phonesCount: this.countPhones(phones),
                phones: phones
            };
        },

        getName: function() {
            const nameInput = document.querySelector('.js-linked-name-view');
            if (!nameInput) return '';
            
            return nameInput.value || '';
        },

        getPhones: function() {
            const phones = [];
            
            const phoneInputs = document.querySelectorAll('.control-phone__formatted');
            
            phoneInputs.forEach(input => {
                const originalPhone = input.value || '';
                if (originalPhone.trim()) {
                    phones.push({
                        normalized: this.normalizePhone(originalPhone),
                        original: originalPhone
                    });
                }
            });
            
            return phones;
        },

        countPhones: function(phonesArray = null) {
            const phones = phonesArray || this.getPhones();
            return phones.length;
        },

        normalizePhone: function(phone) {
            if (!phone || typeof phone !== 'string') return '';
            
            return phone.replace(/\D/g, '');
        },

        getPhonesFromContainer: function() {
            const phones = [];
            const container = document.querySelector('.linked-form__multiple-container');
            
            if (!container) return phones;
            
            const phoneInputs = container.querySelectorAll('.control-phone__formatted');
            
            phoneInputs.forEach(input => {
                const originalPhone = input.value || '';
                if (originalPhone.trim()) {
                    phones.push({
                        normalized: this.normalizePhone(originalPhone),
                        original: originalPhone
                    });
                }
            });
            
            return phones;
        }
    };

    return CardParser;
});