define([
    './GroupSelector.js',
    './MessageTypeSelector.js',
    './PrioritySourceSelector.js',
    './ButtonMessageSend.js',
    './PhoneSelector.js',
    './Loader.js',
    './AppModal.js',
    '../modules/Api.js',
    '../modules/Utils.js',
    '../modules/Validator.js',
    '../modules/CardParser.js'
], function(GroupSelector, MessageTypeSelector, PrioritySourceSelector, 
    ButtonMessageSend, PhoneSelector, Loader, AppModal, Api, Utils, Validator, CardParser) {
    
    const AppForm = ({ widget }) => {
        const { html, useState, useEffect } = window.htmPreact;
        
        const [state, setState] = useState({
            name: 'TODO', //TODO name of the current contact selected
            to: '',
            text: '',
            selectedGroup: '',
            messageType: 'cascade',
            prioritySource: '',
            groups: {},
            loading: false,
            cardData: null,
            isParsingCard: true,
            selectedPhone: '',
            showModal: false,
            modalStatus: '',
            requestData: {
                domain: '',
                widget_code: '',
                amouser: '',
                amouser_id: '',
                area: ''
            }
        });
        
        useEffect(() => {
            const system = widget.system();
            const settings = widget.get_settings();
            
            const requestData = {
                domain: system.domain,
                widget_code: settings.widget_code,
                amouser: system.amouser,
                amouser_id: system.amouser_id,
                area: system.area
            };
            
            setState(prev => ({ ...prev, requestData: requestData }));
            loadAllDataAsync(requestData);
        }, []);
        
        const loadAllDataAsync = async (requestData) => {
            try {
                const cardPromise = parseCardDataAsync();
                const groupsPromise = loadGroupsAsync(requestData);
                
                const [cardData, groupsData] = await Promise.all([cardPromise, groupsPromise]);
                
                setState(prev => ({
                    ...prev,
                    cardData: cardData,
                    name: cardData.name || '',
                    to: cardData.phones.length > 0 ? cardData.phones[0].normalized : '',
                    selectedPhone: cardData.phones.length > 0 ? cardData.phones[0].normalized : '',
                    groups: groupsData,
                    isParsingCard: false
                }));
                
            } catch (error) {
                console.debug('Ошибка загрузки данных:', error);
                setState(prev => ({
                    ...prev,
                    isParsingCard: false,
                    cardData: { name: '', phonesCount: 0, phones: [] },
                    groups: {}
                }));
                Utils.showError(state.requestData.widget_code, 'Ошибка загрузки данных');
            }
        };

        const parseCardDataAsync = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 100));
                return CardParser.getCardData();
            } catch (error) {
                console.debug('Ошибка парсинга карточки:', error);
                return { name: '', phonesCount: 0, phones: [] };
            }
        };

        const loadGroupsAsync = (requestData) => {
            return new Promise((resolve, reject) => {
                const groupRequestData = {
                    domain: requestData.domain,
                    widget_code: requestData.widget_code,
                    amouser: requestData.amouser,
                    amouser_id: requestData.amouser_id,
                    area: requestData.area
                };

                Api.getGroups(widget, groupRequestData, function(response) {
                    if (response && response.ok) {
                        resolve(response.data.vendor_groups || {});
                    } else {
                        reject(new Error('Не удалось загрузить группы'));
                    }
                });
            });
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            
            if (!Validator.validateMessageForm(state, state, Utils.showError)) {
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

            Api.sendMessage(widget, requestData, function(response) {
                setState(prev => ({
                    ...prev,
                    loading: false,
                    showModal: true,
                    modalStatus: response && response.ok ? 'success' : 'error'
                }));
            });
        };
        
        const handleCloseModal = () => {
            setState(prev => ({ ...prev, showModal: false }));
        };

        const handleResetForm = () => {
            setState(prev => Utils.resetFormState(prev));
            setState(prev => ({ ...prev, showModal: false }));
        };

        const handleRetry = () => {
            setState(prev => ({ ...prev, showModal: false, loading: false }));
        };

        return html`
            <div>
                <form onSubmit=${handleSubmit} >
                    ${state.isParsingCard && html`
                        <${Loader} isLoading=${true} text="Загружаем данные..."/>
                    `}
                    
                    ${!state.isParsingCard && html`
                        <div>
                            <label class="card-cf-name-label__label integrilla-form__label">Телефон:</label>
                            ${state.cardData && state.cardData.phones.length > 0 ? html`
                                <${PhoneSelector}
                                    phones=${state.cardData.phones}
                                    selectedPhone=${state.selectedPhone}
                                    onPhoneChange=${e => setState({ 
                                        ...state, 
                                        selectedPhone: e.target.value,
                                        to: e.target.value 
                                    })}
                                    disabled=${state.loading}
                                />
                            ` : html`
                                <input 
                                    type="text" 
                                    value=${state.to}
                                    onInput=${e => setState({ ...state, to: e.target.value })}
                                    disabled=${state.loading}
                                    placeholder="Телефон не найден в карточке"
                                />
                            `}
                        </div>
                        
                        <div>
                            <label class="card-cf-name-label__label">Группа:</label>
                            <${GroupSelector}
                                groups=${state.groups}
                                selectedGroup=${state.selectedGroup}
                                onGroupChange=${e => setState({ ...state, selectedGroup: e.target.value })}
                                disabled=${state.loading}
                            />
                        </div>
                        
                        <div>
                            <label class="card-cf-name-label__label">Тип сообщения:</label>
                            <${MessageTypeSelector}
                                messageType=${state.messageType}
                                onMessageTypeChange=${e => setState({ 
                                    ...state, 
                                    messageType: e.target.value, 
                                    prioritySource: '' 
                                })}
                                disabled=${state.loading}
                            />
                        </div>
                        
                        ${state.messageType === 'priority_source' && html`
                            <div>
                                <label class="card-cf-name-label__label">Приоритетный источник:</label>
                                <${PrioritySourceSelector}
                                    prioritySource=${state.prioritySource}
                                    availableSources=${Utils.getAvailableSources(state.groups, state.selectedGroup)}
                                    onPrioritySourceChange=${e => setState({ 
                                        ...state, 
                                        prioritySource: e.target.value 
                                    })}
                                    disabled=${state.loading}
                                />
                            </div>
                        `}
                        
                        <div>
                            <label class="card-cf-name-label__label">Текст сообщения:</label>
                            <textarea 
                                value=${state.text}
                                onInput=${e => setState({ ...state, text: e.target.value })}
                                class="text-input text-input-textarea"
                                disabled=${state.loading}
                                rows="5"
                            />
                        </div>
                        
                        <${ButtonMessageSend}
                            onClick=${handleSubmit}
                            disabled=${state.loading || state.isParsingCard}
                            loading=${state.loading}
                        />
                    `}
                </form>
                
                ${state.showModal && html`
                    <${AppModal} 
                        status=${state.modalStatus}
                        onClose=${handleCloseModal}
                        onReset=${handleResetForm}
                        onRetry=${handleRetry}
                    />
                `}
            </div>
        `;
    };
    
    return AppForm;
});