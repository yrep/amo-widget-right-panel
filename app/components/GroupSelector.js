define(['../modules/Utils.js'], function (Utils) {
    const GroupSelector = ({ groups, selectedGroup, onGroupChange, disabled }) => {
        const { html } = window.htmPreact;
        
        const getGroupDisplayName = (groupKey) => {
            const vendors = groups[groupKey] || [];
            const vendorWithName = vendors.find(vendor => vendor.touchapi_name);
            
            if (vendorWithName && vendorWithName.touchapi_name) {
                return vendorWithName.touchapi_name;
            }
            
            return groupKey;
        };

        return html`
            <select 
                value=${selectedGroup} 
                onChange=${onGroupChange}
                disabled=${disabled}
                class="control--select--button"
                style=${{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
            >
                <option value="">Выберите группу</option>
                ${Object.keys(groups).map(groupKey => html`
                    <option value=${groupKey}>
                        ${getGroupDisplayName(groupKey)}
                    </option>
                `)}
            </select>
        `;
    };
    
    return GroupSelector;
});