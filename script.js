const goalInput = document.getElementById('goalInput');
const addGoalBtn = document.getElementById('addGoalBtn');
const goalsContainer = document.getElementById('goalsContainer');

// Load goals from localStorage
let goals = JSON.parse(localStorage.getItem('goals')) || [];

// Function to save goals to localStorage
function saveGoals() {
    localStorage.setItem('goals', JSON.stringify(goals));
}

// Function to create a goal element
function createGoalElement(goal, index) {
    const goalItem = document.createElement('li');
    goalItem.className = 'goal-item';
    
    goalItem.innerHTML = `
        <span class="goal-text ${goal.completed ? 'completed' : ''}">${goal.text}</span>
        <div class="goal-actions">
            <button class="complete-btn" onclick="toggleGoal(${index})">
                ${goal.completed ? 'Undo' : 'Complete'}
            </button>
            <button class="delete-btn" onclick="deleteGoal(${index})">Delete</button>
        </div>
    `;
    
    return goalItem;
}

// Function to render all goals
function renderGoals() {
    goalsContainer.innerHTML = '';
    
    if (goals.length === 0) {
        goalsContainer.innerHTML = '<p class="empty-message">No goals at the moment!</p>';
        return;
    }
    
    goals.forEach((goal, index) => {
        const goalElement = createGoalElement(goal, index);
        goalsContainer.appendChild(goalElement);
    });
}

// Function to add a new goal
function addGoal() {
    const text = goalInput.value.trim();
    
    if (text === '') {
        alert('Please enter a goal!');
        return;
    }
    
    const newGoal = {
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    goals.push(newGoal);
    saveGoals();
    renderGoals();
    
    // Clear input
    goalInput.value = '';
    goalInput.focus();
}

// Function to toggle goal completion
function toggleGoal(index) {
    goals[index].completed = !goals[index].completed;
    saveGoals();
    renderGoals();
}

// Function to delete a goal
function deleteGoal(index) {
    if (confirm('Are you sure you want to delete this goal?')) {
        goals.splice(index, 1);
        saveGoals();
        renderGoals();
    }
}

// Event listeners
addGoalBtn.addEventListener('click', addGoal);

goalInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addGoal();
    }
});

// Initialize the app
renderGoals();