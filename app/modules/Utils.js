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
        }
    };

    return Utils;
});