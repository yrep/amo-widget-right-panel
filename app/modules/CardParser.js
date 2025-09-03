define([], function() {
    const CardParser = {
        getCardData: function() {
            try {
                // const nameInput = document.querySelector('.js-linked-name-view');
                // const name = nameInput?.value || '';

                const phoneInputs = document.querySelectorAll('.control-phone__formatted');
                const phones = [];

                phoneInputs.forEach(input => {
                    const original = input.value || '';
                    if (original.trim()) {
                        phones.push({
                            normalized: this.normalizePhone(original),
                            original: original
                        });
                    }
                });

                //console.debug('name', name)
                console.debug('phones', phones)

                return {
                    //name: name,
                    phonesCount: phones.length,
                    phones: phones
                };

            } catch (error) {
                console.debug('CardParser error:', error);
                return {
                    //name: '',
                    phonesCount: 0,
                    phones: []
                };
            }
        },

        countPhones: function() {
            const data = this.getCardData();
            return data.phonesCount;
        },

        normalizePhone: function(phone) {
            if (!phone || typeof phone !== 'string') return '';
            return phone.replace(/\D/g, '');
        }
    };

    return CardParser;
});