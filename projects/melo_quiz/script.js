// --- DATA: Question Bank ---
const questionBank = {
    frontend: [
        { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"], a: 0 },
        { q: "Which CSS property controls text size?", options: ["font-style", "text-size", "font-size"], a: 2 },
        { q: "Which HTML tag is used for internal CSS?", options: ["<css>", "<style>", "<script>"], a: 1 },
        { q: "What is the default display value of a div?", options: ["inline", "block", "flex"], a: 1 },
        { q: "Which selector targets an ID?", options: [".", "#", "*"], a: 1 }
    ],
    js: [
        { q: "Inside which HTML element do we put the JavaScript?", options: ["<js>", "<scripting>", "<script>"], a: 2 },
        { q: "How do you write 'Hello World' in an alert box?", options: ["msg('Hello World')", "alertBox('Hello World')", "alert('Hello World')"], a: 2 },
        { q: "Which operator is used for strict equality?", options: ["==", "===", "="], a: 1 },
        { q: "Which method adds an element to the end of an array?", options: ["push()", "pop()", "shift()"], a: 0 },
        { q: "What is the correct way to create a function?", options: ["function myFunction()", "create myFunction()", "function:myFunction()"], a: 0 }
    ],
    mixed: [
        { q: "Which is not a JavaScript data type?", options: ["Number", "Boolean", "Float"], a: 2 },
        { q: "Which HTML5 API is used for persistent storage?", options: ["Cookies", "LocalStorage", "SessionStorage"], a: 1 },
        { q: "What does DOM stand for?", options: ["Data Object Model", "Document Object Model", "Digital Ordinance Model"], a: 1 },
        { q: "Which CSS unit is relative to the root font size?", options: ["em", "rem", "px"], a: 1 },
        { q: "How do you declare a constant in JS?", options: ["var", "let", "const"], a: 2 }
    ]
};

// --- STATE MANAGEMENT ---
let currentState = {
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    timer: 15,
    timerInterval: null,
    isAnswered: false,
    category: 'frontend'
};

// --- DOM ELEMENTS ---
const views = {
    home: document.getElementById('home-view'),
    quiz: document.getElementById('quiz-view'),
    result: document.getElementById('result-view')
};
const themeBtn = document.getElementById('theme-btn');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const homeBtn = document.getElementById('home-btn');
const categorySelect = document.getElementById('category-select');

const quizEl = {
    questionCounter: document.getElementById('question-counter'),
    timer: document.getElementById('timer'),
    progressBar: document.getElementById('progress-bar'),
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container')
};

const resultEl = {
    scoreCircle: document.getElementById('score-circle'),
    finalScore: document.getElementById('final-score'),
    bestScoreDisplay: document.getElementById('best-score-display'),
    bestScoreVal: document.getElementById('best-score-val'),
    resultMessage: document.getElementById('result-message')
};

// --- AUDIO FEEDBACK (Optional Advanced Feature) ---
// Using AudioContext to avoid external files, synthesized beeps
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (type === 'correct') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(500, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1000, audioCtx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.3);
    } else if (type === 'wrong') {
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(300, audioCtx.currentTime);
        oscillator.frequency.linearRampToValueAtTime(100, audioCtx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.3);
    }
}

// --- APP LOGIC ---

function switchView(viewName) {
    Object.values(views).forEach(el => el.classList.remove('active'));
    views[viewName].classList.add('active');
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startQuiz() {
    currentState.category = categorySelect.value;
    // Clone and shuffle questions
    currentState.questions = shuffleArray([...questionBank[currentState.category]]);
    currentState.currentQuestionIndex = 0;
    currentState.score = 0;
    
    switchView('quiz');
    loadQuestion();
}

function loadQuestion() {
    const qData = currentState.questions[currentState.currentQuestionIndex];
    currentState.isAnswered = false;
    currentState.timer = 15;

    // UI Updates
    quizEl.questionCounter.textContent = `Question ${currentState.currentQuestionIndex + 1}/${currentState.questions.length}`;
    const progressPercent = ((currentState.currentQuestionIndex) / currentState.questions.length) * 100;
    quizEl.progressBar.style.width = `${progressPercent}%`;
    
    quizEl.questionText.textContent = qData.q;
    quizEl.optionsContainer.innerHTML = '';

    // Create Options
    qData.options.forEach((opt, index) => {
        const btn = document.createElement('div');
        btn.className = 'option-card';
        btn.textContent = opt;
        btn.onclick = () => handleAnswer(index, btn);
        quizEl.optionsContainer.appendChild(btn);
    });

    startTimer();
}

function startTimer() {
    clearInterval(currentState.timerInterval);
    quizEl.timer.textContent = `${currentState.timer}s`;
    quizEl.timer.parentElement.style.backgroundColor = 'rgba(108, 99, 255, 0.1)';

    currentState.timerInterval = setInterval(() => {
        currentState.timer--;
        quizEl.timer.textContent = `${currentState.timer}s`;

        // Color warning
        if(currentState.timer <= 5) {
            quizEl.timer.parentElement.style.backgroundColor = 'rgba(255, 107, 107, 0.2)';
            quizEl.timer.parentElement.style.color = 'var(--accent)';
        }

        if (currentState.timer <= 0) {
            handleTimeout();
        }
    }, 1000);
}

function handleTimeout() {
    clearInterval(currentState.timerInterval);
    currentState.isAnswered = true;
    
    // Show correct answer
    const qData = currentState.questions[currentState.currentQuestionIndex];
    const options = document.querySelectorAll('.option-card');
    options[qData.a].classList.add('correct');
    options.forEach(opt => opt.style.pointerEvents = 'none');

    showToast("Time's up!", false);
    setTimeout(nextQuestion, 2000);
}

function handleAnswer(selectedIndex, btnElement) {
    if (currentState.isAnswered) return;
    currentState.isAnswered = true;
    clearInterval(currentState.timerInterval);

    const qData = currentState.questions[currentState.currentQuestionIndex];
    const isCorrect = selectedIndex === qData.a;

    // Visual Feedback
    if (isCorrect) {
        btnElement.classList.add('correct');
        currentState.score++;
        playSound('correct');
        showToast("Correct Answer!", true);
    } else {
        btnElement.classList.add('wrong');
        // Highlight the correct one
        document.querySelectorAll('.option-card')[qData.a].classList.add('correct');
        playSound('wrong');
        showToast("Wrong Answer", false);
    }

    // Disable all clicks
    document.querySelectorAll('.option-card').forEach(opt => opt.style.pointerEvents = 'none');

    // Delay before next question
    setTimeout(nextQuestion, 1500);
}

function nextQuestion() {
    currentState.currentQuestionIndex++;
    if (currentState.currentQuestionIndex < currentState.questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    switchView('result');
    const total = currentState.questions.length;
    const percentage = Math.round((currentState.score / total) * 100);
    
    // Update Score Circle
    resultEl.scoreCircle.style.background = `conic-gradient(var(--primary) ${percentage}%, rgba(0,0,0,0.1) 0%)`;
    resultEl.finalScore.textContent = `${percentage}%`;

    // Message Logic
    if (percentage === 100) resultEl.resultMessage.textContent = "Perfect! You're a master! 🏆";
    else if (percentage >= 80) resultEl.resultMessage.textContent = "Great job! Keep it up! 🚀";
    else if (percentage >= 50) resultEl.resultMessage.textContent = "Not bad, but room for improvement. 📚";
    else resultEl.resultMessage.textContent = "Keep practicing, you'll get better! 💪";

    // Handle LocalStorage (Best Score)
    const storageKey = `melo_best_score_${currentState.category}`;
    let savedBest = localStorage.getItem(storageKey);
    
    if (savedBest === null || percentage > parseInt(savedBest)) {
        localStorage.setItem(storageKey, percentage);
        savedBest = percentage;
        showToast("New High Score!", true);
    }

    resultEl.bestScoreDisplay.style.display = 'inline-block';
    resultEl.bestScoreVal.textContent = savedBest;
}

// --- UTILITIES ---

function showToast(msg, isSuccess) {
    const toast = document.getElementById('feedback-toast');
    toast.textContent = msg;
    toast.style.background = isSuccess ? 'var(--success)' : 'var(--text-main)';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

// Theme Toggle Logic
let isDark = false;
themeBtn.addEventListener('click', () => {
    isDark = !isDark;
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
    
    // Toggle Icon
    themeBtn.innerHTML = isDark 
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
});

// Event Listeners
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', startQuiz);
homeBtn.addEventListener('click', () => switchView('home'));