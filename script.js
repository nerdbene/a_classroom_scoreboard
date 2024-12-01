// 🎮 Let the games begin! Wait for the DOM to load before we start the party
document.addEventListener('DOMContentLoaded', function() {
    init();
});

function init() {
    // 🎯 Grab our essential elements - they're like the remote controls of our app
    const addTeamBtn = document.getElementById('addTeamBtn');
    const teamsContainer = document.getElementById('teams-container');
    let teamCount = 0;

    // 🎉 Create our celebration stage - where the magic happens!
    const celebrationOverlay = document.createElement('div');
    celebrationOverlay.className = 'celebration-overlay';
    document.body.appendChild(celebrationOverlay);

    // ➕ When someone clicks "Add Team", we roll out the red carpet for a new competitor
    addTeamBtn.addEventListener('click', () => {
        teamCount++;
        addTeam(teamCount);
    });

    // 🎨 The confetti factory - where joy is manufactured one piece at a time!
    function createConfetti() {
        // 🌈 Our confetti color palette - because victory should be colorful
        const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ff9999'];
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';

            // 🏃‍♂️ Some confetti are speed demons, others like to take their time
            const speeds = ['slow', 'medium', 'fast'];
            const randomSpeed = speeds[Math.floor(Math.random() * speeds.length)];
            confetti.classList.add(randomSpeed);

            // 💃 Let's make our confetti dance - left, right, or straight down!
            const swayTypes = ['sway-left', 'sway-right', ''];
            const randomSway = swayTypes[Math.floor(Math.random() * swayTypes.length)];
            if (randomSway) {
                confetti.classList.add(randomSway);
            }

            // 🎨 Each piece gets its own style - because conformity is boring
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.transform = `scale(${Math.random() * 0.8 + 0.2})`;
            confetti.style.rotate = Math.random() * 360 + 'deg';

            celebrationOverlay.appendChild(confetti);
            
            // 🧹 Clean up after the party - no confetti left behind!
            confetti.addEventListener('animationend', () => {
                confetti.remove();
            });
        }
    }

    // 🏆 Time to crown our champion with style!
    function celebrateWinner(teamName) {
        celebrationOverlay.innerHTML = '';
        const announcement = document.createElement('div');
        announcement.className = 'winner-announcement';
        announcement.innerHTML = `🎉 ${teamName} Wins! 🎉`;
        celebrationOverlay.appendChild(announcement);
        
        celebrationOverlay.classList.add('active');
        createConfetti();
        
        // ⏰ All good parties must come to an end (after 3 seconds)
        setTimeout(() => {
            celebrationOverlay.classList.remove('active');
        }, 3000);
    }

    // 🏃‍♀️ New team on the block! Let's get them set up
    function addTeam(number) {
        const teamColumn = document.createElement('div');
        teamColumn.className = 'team-column';

        // ✏️ Let teams pick their battle name
        const teamName = document.createElement('div');
        teamName.className = 'team-name';
        teamName.textContent = `Team ${number}`;
        teamName.setAttribute('contenteditable', 'true');

        // 💫 Add some flair when editing team names
        teamName.addEventListener('focus', () => {
            teamName.classList.add('editing');
        });
        teamName.addEventListener('blur', () => {
            teamName.classList.remove('editing');
        });

        // 🔢 The scoreboard - where dreams are made (or crushed)
        const scoreDisplay = document.createElement('div');
        scoreDisplay.className = 'score-display';
        scoreDisplay.textContent = '0';

        // 🎮 The control center - for point wizardry
        const scoreControls = document.createElement('div');
        scoreControls.className = 'score-controls';

        const minusBtn = document.createElement('button');
        minusBtn.className = 'score-button minus-button';
        minusBtn.textContent = '−';

        const plusBtn = document.createElement('button');
        plusBtn.className = 'score-button plus-button';
        plusBtn.textContent = '+';

        // 🛠️ Team management tools - for when things need shaking up
        const teamActions = document.createElement('div');
        teamActions.className = 'team-actions';

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'action-icon-button delete-button';
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.title = 'Delete Team';

        const crownBtn = document.createElement('button');
        crownBtn.className = 'action-icon-button crown-button';
        crownBtn.innerHTML = '👑';
        crownBtn.title = 'Declare Winner';

        // 🎯 Make everything actually work (the important part!)
        let score = 0;
        minusBtn.addEventListener('click', () => {
            score = Math.max(0, score - 1); // No negative scores - we're not that mean!
            scoreDisplay.textContent = score;
        });

        plusBtn.addEventListener('click', () => {
            score++;
            scoreDisplay.textContent = score;
        });

        deleteBtn.addEventListener('click', () => {
            teamColumn.remove(); // Goodbye, farewell, auf wiedersehen, goodbye! 👋
        });

        crownBtn.addEventListener('click', () => {
            celebrateWinner(teamName.textContent); // Time to party! 🎉
        });

        // 🏗️ Put it all together like a LEGO master
        scoreControls.appendChild(minusBtn);
        scoreControls.appendChild(scoreDisplay);
        scoreControls.appendChild(plusBtn);

        teamActions.appendChild(deleteBtn);
        teamActions.appendChild(crownBtn);

        teamColumn.appendChild(teamName);
        teamColumn.appendChild(scoreControls);
        teamColumn.appendChild(teamActions);

        teamsContainer.appendChild(teamColumn);
    }
}
