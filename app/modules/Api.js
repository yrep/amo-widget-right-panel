define([
     "../../config.js",
], function(config) {
    const Api = {
        getGroups: function(widget, data, callback, useFetch = false) {
            // Удаляем ненужное поле target
            const requestData = { ...data };
            delete requestData.target;

            console.debug('Sending GET_GROUPS request:', {
                url: config.GROUPS_URL,
                data: requestData,
                useFetch: useFetch
            });

            if (useFetch) {
                return this._fetchRequest(
                    config.GROUPS_URL,
                    requestData,
                    callback
                );
            }

            widget.crm_post(
                config.GROUPS_URL,
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
                url: config.CASCADE_MESSAGE_SEND_URL,
                data: requestData,
                useFetch: useFetch
            });

            if (useFetch) {
                return this._fetchRequest(
                    config.CASCADE_MESSAGE_SEND_URL,
                    requestData,
                    callback
                );
            }

            widget.crm_post(
                config.CASCADE_MESSAGE_SEND_URL,
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