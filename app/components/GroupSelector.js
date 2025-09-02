define([], function() {
    const GroupSelector = ({ groups, selectedGroup, onGroupChange }) => {
        const { html } = window.htmPreact;

        return html`
            <select value=${selectedGroup} onChange=${onGroupChange}>
                <option value="">Выберите группу</option>
                ${Object.entries(groups).map(([token, vendors]) => html`
                    <option value=${token}>
                        ${vendors.find(v => v.touchapi_name)?.touchapi_name || token}
                    </option>
                `)}
            </select>
        `;
    };

    return GroupSelector;
});