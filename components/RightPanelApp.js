define([
], function () {

    const mount = (rootElement) => {
        if (rootElement) {
            const div = document.createElement('div');
            div.textContent = 'Simple App';
            rootElement.appendChild(div);
        }
    };

    return {
        mount: mount,
    };
});
