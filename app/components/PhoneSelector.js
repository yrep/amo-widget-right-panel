define([], function () {
    const PhoneSelector = ({ phones, selectedPhone, onPhoneChange, disabled }) => {
        const { html } = window.htmPreact;
        
        return html`
            <select 
                value=${selectedPhone} 
                onChange=${onPhoneChange}
                class="control--select--button"
                disabled=${disabled}
                style=${{width: '100%'}}
            >
                <option value="">Выберите телефон</option>
                ${phones.map(phone => html`
                    <option value=${phone.normalized}>
                        ${phone.original}
                    </option>
                `)}
            </select>
        `;
    };
    
    return PhoneSelector;
});