define([], function () {
    const AppForm = ({ fields, onSubmit }) => {
        const { html } = window.htmPreact;

        return html`
            <form onSubmit=${onSubmit}>
                ${fields.map(field => html`
                    <div>
                        <label>${field.label}</label>
                        <input type=${field.type} name=${field.name} />
                    </div>
                `)}
                <button type="submit">Отправить</button>
            </form>
        `;
    };
    return AppForm;
});