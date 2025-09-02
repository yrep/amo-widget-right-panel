define([
    './GroupSelector.js',
    './MessageTypeSelector.js',
    './PrioritySourceSelector.js',
    './ButtonMessageSend.js',
    '../modules/Api.js',
    '../modules/Utils.js'
], function(GroupSelector, MessageTypeSelector, PrioritySourceSelector, ButtonMessageSend, Api, Utils) {
    const AppForm = ({ widget }) => {
        const { html, useState, useEffect } = window.htmPreact;
        
        const [state, setState] = useState({
            name: '',
            to: '',
            text: '',
            selectedGroup: '',
            messageType: 'cascade',
            prioritySource: '',
            groups: {},
            loading: false,
            requestData: {
                domain: '',
                widget_code: '',
                amouser: '',
                amouser_id: '',
                area: ''
            }
        });
        
        useEffect(() => {
            console.debug('AppForm mounted, loading groups...');
            
            // Инициализируем данные для запросов
            const system = widget.system();
            const settings = widget.get_settings();
            
            const requestData = {
                domain: system.domain,
                widget_code: settings.widget_code,
                amouser: system.amouser,
                amouser_id: system.amouser_id,
                area: system.area
            };
            
            console.debug('Initial request data:', requestData);
            
            setState(prev => ({
                ...prev,
                requestData: requestData
            }));
            
            loadGroups(requestData);
        }, []);
        
        const loadGroups = (requestData) => {
            console.debug('Loading groups with data:', requestData);
            
            // Для запроса групп используем только domain и widget_code
            const groupRequestData = {
                domain: requestData.domain,
                widget_code: requestData.widget_code,
                amouser: requestData.amouser,
                amouser_id: requestData.amouser_id,
                area: requestData.area
            };
            
            Api.getGroups(widget, groupRequestData, function(response) {
                console.debug('Groups response received:', response);
                if (response && response.ok) {
                    setState(prev => ({
                        ...prev,
                        groups: response.data.vendor_groups || {}
                    }));
                    console.debug('Groups set to state:', response.data.vendor_groups);
                } else {
                    console.debug('Groups loading failed:', response);
                    Utils.showError(requestData.widget_code, 'Ошибка загрузки групп');
                }
            });
        };
        
        const handleSubmit = (e) => {
            e.preventDefault();
            
            console.debug('Form submit attempted:', state);
            
            if (!validateForm()) {
                return;
            }
            
            setState(prev => ({ ...prev, loading: true }));
            
            const requestData = {
                ...state.requestData,
                to: state.to,
                name: state.name,
                group: { [state.selectedGroup]: state.groups[state.selectedGroup] || [] },
                message_type: state.messageType,
                priority_source: state.prioritySource,
                text: state.text
            };
            
            console.debug('Sending message with data:', requestData);
            
            Api.sendMessage(widget, requestData, function(response) {
                console.debug('Send message response:', response);
                setState(prev => ({ ...prev, loading: false }));
                
                if (response && response.ok) {
                    console.debug('Message sent successfully');
                } else {
                    Utils.showError(state.requestData.widget_code, 'Ошибка отправки сообщения');
                }
            });
        };
        
        const validateForm = () => {
            if (!state.name || !state.to || !state.text || !state.selectedGroup) {
                console.debug('Validation failed: missing required fields');
                Utils.showError(state.requestData.widget_code, 'Заполните все обязательные поля');
                return false;
            }
            
            if (state.messageType === 'priority_source' && !state.prioritySource) {
                console.debug('Validation failed: priority source required');
                Utils.showError(state.requestData.widget_code, 'Выберите приоритетный источник');
                return false;
            }
            
            console.debug('Validation passed');
            return true;
        };
        
        const getAvailableSources = () => {
            const sources = new Set(['sms']);
            
            if (state.selectedGroup && state.groups[state.selectedGroup]) {
                state.groups[state.selectedGroup].forEach(vendor => {
                    if (vendor.source) {
                        sources.add(vendor.source === 'whatsapp' ? 'wa' : 
                                   vendor.source === 'telegram' ? 'tg' : vendor.source);
                    }
                });
            }
            
            console.debug('Available sources:', Array.from(sources));
            return Array.from(sources);
        };
        
        return html`
            <form onSubmit=${handleSubmit}>
                <div>
                    <label>Имя:</label>
                    <input 
                        type="text" 
                        value=${state.name}
                        onInput=${e => setState({ ...state, name: e.target.value })}
                    />
                </div>
                
                <div>
                    <label>Телефон:</label>
                    <input 
                        type="text" 
                        value=${state.to}
                        onInput=${e => setState({ ...state, to: e.target.value })}
                    />
                </div>
                
                <div>
                    <label>Группа:</label>
                    <${GroupSelector}
                        groups=${state.groups}
                        selectedGroup=${state.selectedGroup}
                        onGroupChange=${e => setState({ ...state, selectedGroup: e.target.value })}
                    />
                </div>
                
                <div>
                    <label>Тип сообщения:</label>
                    <${MessageTypeSelector}
                        messageType=${state.messageType}
                        onMessageTypeChange=${e => setState({ ...state, messageType: e.target.value, prioritySource: '' })}
                    />
                </div>
                
                ${state.messageType === 'priority_source' && html`
                    <div>
                        <label>Приоритетный источник:</label>
                        <${PrioritySourceSelector}
                            prioritySource=${state.prioritySource}
                            availableSources=${getAvailableSources()}
                            onPrioritySourceChange=${e => setState({ ...state, prioritySource: e.target.value })}
                        />
                    </div>
                `}
                
                <div>
                    <label>Текст сообщения:</label>
                    <textarea 
                        value=${state.text}
                        onInput=${e => setState({ ...state, text: e.target.value })}
                    />
                </div>
                
                <${ButtonMessageSend}
                    onClick=${handleSubmit}
                    disabled=${state.loading}
                />
            </form>
        `;
    };
    
    return AppForm;
});