define([], function() {
    const Api = {
        getGroups: function(widget, data, callback, useFetch = false) {
            // Удаляем ненужное поле target
            const requestData = { ...data };
            delete requestData.target;

            console.debug('Sending GET_GROUPS request:', {
                url: 'https://time.developtech.ru/api/v1/message/groups',
                data: requestData,
                useFetch: useFetch
            });

            if (useFetch) {
                return this._fetchRequest(
                    'https://time.developtech.ru/api/v1/message/groups',
                    requestData,
                    callback
                );
            }

            widget.crm_post(
                'https://time.developtech.ru/api/v1/message/groups',
                requestData,
                function(response) {
                    console.debug('GET_GROUPS response:', response);
                    callback(response);
                },
                'json'
            );
        },

        sendMessage: function(widget, data, callback, useFetch = false) {
            // Удаляем ненужное поле target
            const requestData = { ...data };
            delete requestData.target;

            console.debug('Sending SEND_MESSAGE request:', {
                url: 'https://time.developtech.ru/api/v1/message/send',
                data: requestData,
                useFetch: useFetch
            });

            if (useFetch) {
                return this._fetchRequest(
                    'https://time.developtech.ru/api/v1/message/send',
                    requestData,
                    callback
                );
            }

            widget.crm_post(
                'https://time.developtech.ru/api/v1/message/send',
                requestData,
                function(response) {
                    console.debug('SEND_MESSAGE response:', response);
                    callback(response);
                },
                'json'
            );
        },

        _fetchRequest: function(url, data, callback) {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                console.debug('FETCH response:', data);
                callback(data);
            })
            .catch(error => {
                console.debug('FETCH error:', error);
                callback({ ok: false, error: error });
            });
        }
    };

    return Api;
});