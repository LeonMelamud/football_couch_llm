// chatTeams.js

function explainTeams() {
    if (!API_KEY) {
        addApiKeyRequest();
        return;
    }

    const teamsExplanation = teams.map((team, index) => 
        `קבוצה ${index + 1}: ${team.map(p => `${p.name} (רמה ${p.level})`).join(', ')}`
    ).join('\n');

    sendMessage(CHAT_CONSTANTS.EXPLAIN_TEAMS_PROMPT.replace('{teamsExplanation}', teamsExplanation));
}