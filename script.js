let players = [];
let teamSize = 5;

function addPlayer() {
    const name = document.getElementById('player-name').value;
    const level = parseInt(document.getElementById('player-level').value);

    if (name && level >= 1 && level <= 5) {
        players.push({ name, level });
        updatePlayerList();
        document.getElementById('player-name').value = '';
        document.getElementById('player-level').value = '';
    } else {
        alert('נא להזין שם ורמה תקינה (1-5)');
    }
}

function updatePlayerList() {
    const playerList = document.getElementById('players');
    playerList.innerHTML = '';
    players.forEach((player, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="text" class="player-name" value="${player.name}" readonly>
            <input type="number" class="player-level" value="${player.level}" min="1" max="5" readonly>
            <button onclick="toggleEdit(${index})" class="btn btn-small btn-edit">
                <i class="fas fa-edit"></i>
            </button>
            <button onclick="removePlayer(${index})" class="btn btn-small btn-danger">
                <i class="fas fa-trash"></i>
            </button>
        `;
        playerList.appendChild(li);
    });
}

function removePlayer(index) {
    players.splice(index, 1);
    updatePlayerList();
}

function updateTeamSize() {
    const newSize = parseInt(document.getElementById('team-size-input').value);
    teamSize = newSize;
    alert(`גודל הקבוצה עודכן ל-${teamSize} שחקנים`);

}

function createRandomTeams() {
    if (players.length < teamSize * 2) {
        alert(`נדרשים לפחות ${teamSize * 2} שחקנים ליצירת לפחות שתי קבוצות`);
        return;
    }

    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
    const numTeams = Math.floor(players.length / teamSize);
    const teams = Array.from({ length: numTeams }, () => []);
    const teamLevels = Array(numTeams).fill(0);

    shuffledPlayers.forEach((player, index) => {
        const teamIndex = index % numTeams;
        teams[teamIndex].push(player);
        teamLevels[teamIndex] += player.level;
    });

    // נסה לאזן את הקבוצות
    for (let i = 0; i < 100; i++) { // מספר ניסיונות לאיזון
        let maxTeamIndex = teamLevels.indexOf(Math.max(...teamLevels));
        let minTeamIndex = teamLevels.indexOf(Math.min(...teamLevels));

        if (maxTeamIndex === minTeamIndex) break;

        let maxLevelPlayer = teams[maxTeamIndex].reduce((max, p) => p.level > max.level ? p : max);
        let minLevelPlayer = teams[minTeamIndex].reduce((min, p) => p.level < min.level ? p : min);

        // החלף שחקנים אם זה משפר את האיזון
        if (maxLevelPlayer.level > minLevelPlayer.level) {
            teams[maxTeamIndex] = teams[maxTeamIndex].filter(p => p !== maxLevelPlayer);
            teams[minTeamIndex] = teams[minTeamIndex].filter(p => p !== minLevelPlayer);
            teams[maxTeamIndex].push(minLevelPlayer);
            teams[minTeamIndex].push(maxLevelPlayer);
            teamLevels[maxTeamIndex] += minLevelPlayer.level - maxLevelPlayer.level;
            teamLevels[minTeamIndex] += maxLevelPlayer.level - minLevelPlayer.level;
        } else {
            break;
        }
    }

    // מיון השחקנים בכל קבוצה לפי רמה (מהגבוה לנמוך)
    teams.forEach(team => team.sort((a, b) => b.level - a.level));

    displayTeams(teams);

    // הצג את הפער בין הקבוצה החזקה ביותר לחלשה ביותר
    const maxLevel = Math.max(...teamLevels);
    const minLevel = Math.min(...teamLevels);
    console.log(`פער הרמות בין הקבוצות: ${maxLevel - minLevel}`);
}

function displayTeams(teams) {
    const teamsDiv = document.getElementById('teams');
    teamsDiv.innerHTML = teams.map((team, index) => {
        const totalLevel = team.reduce((sum, p) => sum + p.level, 0);
        return `
            <div class="card">
                <h2>קבוצה ${index + 1}</h2>
                <ul>${team.map(p => `<li>${p.name} - רמה ${p.level}</li>`).join('')}</ul>
                <p>סה"כ רמה: ${totalLevel}</p>
            </div>
        `;
    }).join('');
}

function generateRandomPlayers() {
    const teamSize = parseInt(document.getElementById('random-team-size').value);
    const numTeams = parseInt(document.getElementById('random-num-teams').value);
    const totalPlayers = teamSize * numTeams;

    const names = [
        "אבי", "בני", "גיא", "דני", "הדר", "ויקטור", "זיו", "חיים", "טל", "יוסי",
        "כפיר", "ליאור", "מיכאל", "נדב", "סער", "עומר", "פבל", "צחי", "קובי", "רון",
        "שגיא", "תום", "אורי", "ברק", "גל", "דור", "הלל", "ולדימיר", "זהר", "חן"
    ];

    players = []; // מאפס את מערך השחקנים הקיים

    for (let i = 0; i < totalPlayers; i++) {
        const name = names[Math.floor(Math.random() * names.length)];
        const level = Math.floor(Math.random() * 5) + 1; // רמה רנדומלית בין 1 ל-5
        players.push({ name: `${name} ${i+1}`, level });
    }

    updatePlayerList();
    alert(`נוצרו ${totalPlayers} שחקנים רנדומליים`);
}

function editPlayer(index) {
    const player = players[index];
    const newName = prompt("הכנס שם חדש:", player.name);
    const newLevel = parseInt(prompt("הכנס רמה חדשה (1-5):", player.level));

    if (newName && !isNaN(newLevel) && newLevel >= 1 && newLevel <= 5) {
        player.name = newName;
        player.level = newLevel;
        updatePlayerList();
    } else {
        alert("נא להזין שם תקין ורמה בין 1 ל-5");
    }
}


function toggleEdit(index) {
    const listItem = document.getElementById('players').children[index];
    const nameInput = listItem.querySelector('.player-name');
    const levelInput = listItem.querySelector('.player-level');
    const editBtn = listItem.querySelector('.btn-edit');

    if (nameInput.readOnly) {
        // מעבר למצב עריכה
        nameInput.readOnly = false;
        levelInput.readOnly = false;
        nameInput.focus();
        editBtn.innerHTML = '<i class="fas fa-save"></i>';
        editBtn.onclick = () => saveEdit(index);
    } else {
        // שמירת השינויים
        saveEdit(index);
    }
}

function saveEdit(index) {
    const listItem = document.getElementById('players').children[index];
    const nameInput = listItem.querySelector('.player-name');
    const levelInput = listItem.querySelector('.player-level');
    const newName = nameInput.value.trim();
    const newLevel = parseInt(levelInput.value);

    if (newName && !isNaN(newLevel) && newLevel >= 1 && newLevel <= 5) {
        players[index].name = newName;
        players[index].level = newLevel;
        updatePlayerList();
    } else {
        alert("נא להזין שם תקין ורמה בין 1 ל-5");
        updatePlayerList(); // מחזיר למצב הקודם
    }
}