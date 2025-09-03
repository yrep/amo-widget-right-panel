define([], function () {
    const Loader = ({ isLoading, text = 'Загрузка...' }) => {
        const { html } = window.htmPreact;

        if (!isLoading) return null;

        return html`
            <div style=${{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}>
                <div style=${{
                    marginRight: '10px',
                    width: '24px',
                    height: '24px',
                }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 50 50"
                        style=${{
                            width: '100%',
                            height: '100%',
                            animation: 'spin 1s linear infinite'
                        }}
                    >
                        <circle
                            cx="25"
                            cy="25"
                            r="20"
                            fill="none"
                            stroke="#35E8A5"
                            stroke-width="4"
                            stroke-linecap="round"
                            stroke-dasharray="90"
                            stroke-dashoffset="60"
                        />
                    </svg>
                </div>
                <div>${text}</div>

                <style>
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                </style>
            </div>
        `;
    };

    return Loader;
});
