function addMessageToChat(sender, message) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;

    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addApiKeyRequest() {
    const chatMessages = document.getElementById('chat-messages');
    const apiKeyMessage = document.createElement('div');
    apiKeyMessage.classList.add('api-key-request');
    apiKeyMessage.innerHTML = `
        <p>${CHAT_CONSTANTS.API_KEY_REQUEST_MESSAGE.replace('{MODEL}', CURRENT_MODEL ? CURRENT_MODEL.name : 'Selected Model')}</p>
        <input type="password" id="api-key-input" placeholder="API Key" aria-label="Enter API key">
        <button onclick="submitApiKey()" aria-label="Submit API key">${CHAT_CONSTANTS.API_KEY_SUBMIT}</button>
    `;
    chatMessages.appendChild(apiKeyMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

window.sendMessage = async function() {
    const input = document.getElementById('chat-input');
    if (!input) return;

    const message = input.value.trim();
    if (message) {
        addMessageToChat('user', message);
        input.value = '';

        if (!API_KEY) {
            addApiKeyRequest();
            return;
        }

        // הוסף אינדיקטור טעינה
        const loadingIndicator = document.createElement('div');
        loadingIndicator.classList.add('loading-indicator');
        document.getElementById('chat-messages').appendChild(loadingIndicator);

        try {
            const response = await askCoach(message);
            loadingIndicator.remove();
            addMessageToChat('bot', response);
        } catch (error) {
            loadingIndicator.remove();
            addMessageToChat('bot', CHAT_CONSTANTS.ERROR_MESSAGE);
            console.error('Error:', error);
            API_KEY = '';
            addApiKeyRequest();
        }
    }
}

// chatMessages.js

window.submitApiKey = async function() {
    const apiKeyInput = document.getElementById('api-key-input');
    if (apiKeyInput && apiKeyInput.value.trim()) {
        const potentialKey = apiKeyInput.value.trim();

        addMessageToChat('bot', CHAT_CONSTANTS.API_KEY_CHECKING.replace('{MODEL}', CURRENT_MODEL ? CURRENT_MODEL.name : 'Selected Model'));

        try {
            const isValid = await validateApiKey(potentialKey);

            if (isValid) {
                API_KEY = potentialKey;
                addMessageToChat('bot', CHAT_CONSTANTS.API_KEY_SUCCESS);
                const apiKeyRequest = document.querySelector('.api-key-request');
                if (apiKeyRequest) {
                    apiKeyRequest.remove();
                }
            } else {
                addMessageToChat('bot', CHAT_CONSTANTS.API_KEY_FAILURE);
            }
        } catch (error) {
            addMessageToChat('bot', CHAT_CONSTANTS.API_KEY_FAILURE);
            console.error('Error during API key validation:', error);
        }
    } else {
        addMessageToChat('bot', CHAT_CONSTANTS.API_KEY_MISSING_ALERT);
    }
}
console.log('submitApiKey function loaded:', typeof window.submitApiKey);

