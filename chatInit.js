let API_KEY = '';
let CURRENT_MODEL = null;
let LLM_LIST = [
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI', apiUrl: 'https://api.openai.com/v1/chat/completions' },
    { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', apiUrl: 'https://api.openai.com/v1/chat/completions' },
    { id: 'claude-2', name: 'Claude-2', provider: 'Anthropic', apiUrl: 'https://api.anthropic.com/v1/complete' },
    { id: 'chat-bison-001', name: 'PaLM 2', provider: 'Google', apiUrl: 'https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage' }
];
async function fetchLLMList() {
    try {
        console.log('Fetching LLM list...');
        //const response = await fetch('https://api.jsonbin.io/b/YOUR_BIN_ID');
        //if (!response.ok) {
        //    throw new Error(`HTTP error! status: ${response.status}`);
        //}
        //const data = await response.json();
        usebackList()
    
    } catch (error) {
        console.error('Error fetching LLM list:', error);
        usebackList();
    }
}

function usebackList() {
    CURRENT_MODEL = LLM_LIST[0];
    console.log('LLM_LIST:', LLM_LIST);
    updateModelList();
    
}

function initializeChat() {
    const chatContainer = document.getElementById('chat-container');
    if (!chatContainer) {
        console.error('Chat container not found');
        return;
    }

    chatContainer.innerHTML = `
        <div id="chat-header">
            ${CHAT_CONSTANTS.COACH_CHAT_TITLE}
            <button onclick="toggleChat()" class="btn-close" aria-label="Close chat">×</button>
        </div>
        <div id="chat-messages" aria-live="polite"></div>
        <div id="chat-input-container">
            <input type="text" id="chat-input" placeholder="${CHAT_CONSTANTS.INPUT_PLACEHOLDER}" aria-label="Chat input">
            <button onclick="sendMessage()" class="btn" aria-label="Send message">${CHAT_CONSTANTS.SEND_BUTTON_TEXT}</button>
        </div>
        <div id="model-selection">
            <select id="model-select" onchange="changeModel()" aria-label="Select AI model">
                ${LLM_LIST.map(model => `<option value="${model.id}">${model.name}</option>`).join('')}
            </select>
        </div>
        <button id="clear-history" onclick="clearChatHistory()">נקה היסטוריה</button>
    `;
    
    chatContainer.style.display = 'none';
    CURRENT_MODEL = LLM_LIST[0]; // Set the first model as default
    console.log('Chat initialized with models:', LLM_LIST);
    updateModelList();

}

function updateModelList() {
    const modelSelect = document.getElementById('model-select');
    if (modelSelect) {
        modelSelect.innerHTML = LLM_LIST.map(model => 
            `<option value="${model.id}">${model.name}</option>`
        ).join('');
        changeModel(); // Ensure CURRENT_MODEL is set correctly
    } else {
        console.error('model-select element not found');
    }
}

window.changeModel = function() {
    const select = document.getElementById('model-select');
    if (select) {
        const selectedModelId = select.value;
        CURRENT_MODEL = LLM_LIST.find(model => model.id === selectedModelId);
        console.log('Changed to model:', CURRENT_MODEL);
        addMessageToChat('system', `המודל הוחלף ל-${CURRENT_MODEL.name}`);
    }
}



window.toggleChat = function() {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
        if (chatContainer.classList.contains('visible')) {
            chatContainer.classList.remove('visible');
            chatContainer.classList.add('hidden');
            setTimeout(() => { chatContainer.style.display = 'none'; }, 300);
        } else {
            chatContainer.style.display = 'flex';
            chatContainer.classList.remove('hidden');
            chatContainer.classList.add('visible');
        }
    }
}

window.clearChatHistory = function() {
    const chatMessages = document.getElementById('chat-messages');
    if (chatMessages) {
        chatMessages.innerHTML = '';
    }
}
// Initialize chat structure
document.addEventListener('DOMContentLoaded', initializeChat);