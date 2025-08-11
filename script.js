document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const retryButton = document.getElementById('retry');
    const timeDisplay = document.getElementById('time');
    const scoreDisplay = document.getElementById('current-score');
    
    let currentQuestion = 0;
    let score = 0;
    let timeLeft = 600; // 10 minutes (600 seconds)
    let timer;
    let userAnswers = [];
    
    // Quiz questions (50 questions)
    const questions = [
        {
            question: "What is the capital of France?",
            answers: [
                { text: "London", correct: false },
                { text: "Berlin", correct: false },
                { text: "Paris", correct: true },
                { text: "Madrid", correct: false }
            ]
        },
        {
            question: "Which planet is known as the Red Planet?",
            answers: [
                { text: "Venus", correct: false },
                { text: "Mars", correct: true },
                { text: "Jupiter", correct: false },
                { text: "Saturn", correct: false }
            ]
        },
        {
            question: "Who painted the Mona Lisa?",
            answers: [
                { text: "Vincent van Gogh", correct: false },
                { text: "Pablo Picasso", correct: false },
                { text: "Leonardo da Vinci", correct: true },
                { text: "Michelangelo", correct: false }
            ]
        },
        {
            question: "What is the largest ocean on Earth?",
            answers: [
                { text: "Atlantic Ocean", correct: false },
                { text: "Indian Ocean", correct: false },
                { text: "Arctic Ocean", correct: false },
                { text: "Pacific Ocean", correct: true }
            ]
        },
        {
            question: "Which element has the chemical symbol 'O'?",
            answers: [
                { text: "Gold", correct: false },
                { text: "Oxygen", correct: true },
                { text: "Osmium", correct: false },
                { text: "Oganesson", correct: false }
            ]
        },
        {
            question: "What is the tallest mountain in the world?",
            answers: [
                { text: "Mount Kilimanjaro", correct: false },
                { text: "Mount Everest", correct: true },
                { text: "K2", correct: false },
                { text: "Mount Denali", correct: false }
            ]
        },
        {
            question: "Which country is home to the kangaroo?",
            answers: [
                { text: "New Zealand", correct: false },
                { text: "South Africa", correct: false },
                { text: "Australia", correct: true },
                { text: "Brazil", correct: false }
            ]
        },
        {
            question: "Who wrote 'Romeo and Juliet'?",
            answers: [
                { text: "Charles Dickens", correct: false },
                { text: "William Shakespeare", correct: true },
                { text: "Jane Austen", correct: false },
                { text: "Mark Twain", correct: false }
            ]
        },
        {
            question: "What is the largest mammal in the world?",
            answers: [
                { text: "African Elephant", correct: false },
                { text: "Blue Whale", correct: true },
                { text: "Giraffe", correct: false },
                { text: "Polar Bear", correct: false }
            ]
        },
        {
            question: "Which planet is closest to the Sun?",
            answers: [
                { text: "Venus", correct: false },
                { text: "Earth", correct: false },
                { text: "Mercury", correct: true },
                { text: "Mars", correct: false }
            ]
        },
        {
            question: "What is the capital of Japan?",
            answers: [
                { text: "Beijing", correct: false },
                { text: "Seoul", correct: false },
                { text: "Tokyo", correct: true },
                { text: "Bangkok", correct: false }
            ]
        },
        {
            question: "Which language has the most native speakers?",
            answers: [
                { text: "English", correct: false },
                { text: "Spanish", correct: false },
                { text: "Mandarin Chinese", correct: true },
                { text: "Hindi", correct: false }
            ]
        },
        {
            question: "What is the largest desert in the world?",
            answers: [
                { text: "Sahara Desert", correct: false },
                { text: "Arabian Desert", correct: false },
                { text: "Antarctica", correct: true },
                { text: "Gobi Desert", correct: false }
            ]
        },
        {
            question: "Who discovered gravity?",
            answers: [
                { text: "Albert Einstein", correct: false },
                { text: "Galileo Galilei", correct: false },
                { text: "Isaac Newton", correct: true },
                { text: "Nikola Tesla", correct: false }
            ]
        },
        {
            question: "What is the currency of the United Kingdom?",
            answers: [
                { text: "Euro", correct: false },
                { text: "Dollar", correct: false },
                { text: "Pound Sterling", correct: true },
                { text: "Yen", correct: false }
            ]
        },
        {
            question: "Which animal is known as the 'King of the Jungle'?",
            answers: [
                { text: "Tiger", correct: false },
                { text: "Elephant", correct: false },
                { text: "Lion", correct: true },
                { text: "Gorilla", correct: false }
            ]
        },
        {
            question: "What is the largest organ in the human body?",
            answers: [
                { text: "Liver", correct: false },
                { text: "Brain", correct: false },
                { text: "Skin", correct: true },
                { text: "Heart", correct: false }
            ]
        },
        {
            question: "Which country invented tea?",
            answers: [
                { text: "India", correct: false },
                { text: "England", correct: false },
                { text: "China", correct: true },
                { text: "Japan", correct: false }
            ]
        },
        {
            question: "What is the smallest country in the world?",
            answers: [
                { text: "Monaco", correct: false },
                { text: "Vatican City", correct: true },
                { text: "San Marino", correct: false },
                { text: "Liechtenstein", correct: false }
            ]
        },
        {
            question: "Which gas makes up most of the Earth's atmosphere?",
            answers: [
                { text: "Oxygen", correct: false },
                { text: "Carbon Dioxide", correct: false },
                { text: "Nitrogen", correct: true },
                { text: "Hydrogen", correct: false }
            ]
        },
        {
            question: "In which year did World War II end?",
            answers: [
                { text: "1943", correct: false },
                { text: "1945", correct: true },
                { text: "1947", correct: false },
                { text: "1950", correct: false }
            ]
        },
        {
            question: "What is the chemical formula for water?",
            answers: [
                { text: "HO2", correct: false },
                { text: "H2O", correct: true },
                { text: "H2O2", correct: false },
                { text: "H3O", correct: false }
            ]
        },
        {
            question: "Who was the first president of the United States?",
            answers: [
                { text: "Thomas Jefferson", correct: false },
                { text: "Abraham Lincoln", correct: false },
                { text: "George Washington", correct: true },
                { text: "John Adams", correct: false }
            ]
        },
        {
            question: "Which of these is not a primary color?",
            answers: [
                { text: "Red", correct: false },
                { text: "Blue", correct: false },
                { text: "Green", correct: true },
                { text: "Yellow", correct: false }
            ]
        },
        {
            question: "What is the square root of 64?",
            answers: [
                { text: "4", correct: false },
                { text: "6", correct: false },
                { text: "8", correct: true },
                { text: "10", correct: false }
            ]
        },
        {
            question: "Which country hosted the 2016 Summer Olympics?",
            answers: [
                { text: "China", correct: false },
                { text: "Brazil", correct: true },
                { text: "Russia", correct: false },
                { text: "Japan", correct: false }
            ]
        },
        {
            question: "What is the main component of the Sun?",
            answers: [
                { text: "Liquid lava", correct: false },
                { text: "Hydrogen", correct: true },
                { text: "Oxygen", correct: false },
                { text: "Carbon dioxide", correct: false }
            ]
        },
        {
            question: "How many continents are there on Earth?",
            answers: [
                { text: "5", correct: false },
                { text: "6", correct: false },
                { text: "7", correct: true },
                { text: "8", correct: false }
            ]
        },
        {
            question: "Which of these is not a programming language?",
            answers: [
                { text: "Python", correct: false },
                { text: "Java", correct: false },
                { text: "HTML", correct: true },
                { text: "C++", correct: false }
            ]
        },
        {
            question: "What is the largest bone in the human body?",
            answers: [
                { text: "Femur (thigh bone)", correct: true },
                { text: "Humerus (upper arm)", correct: false },
                { text: "Tibia (shin bone)", correct: false },
                { text: "Pelvis", correct: false }
            ]
        },
        {
            question: "Which planet has the most moons?",
            answers: [
                { text: "Jupiter", correct: false },
                { text: "Saturn", correct: true },
                { text: "Neptune", correct: false },
                { text: "Uranus", correct: false }
            ]
        },
        {
            question: "What is the hardest natural substance on Earth?",
            answers: [
                { text: "Gold", correct: false },
                { text: "Iron", correct: false },
                { text: "Diamond", correct: true },
                { text: "Quartz", correct: false }
            ]
        },
        {
            question: "Which country has the largest population?",
            answers: [
                { text: "India", correct: false },
                { text: "United States", correct: false },
                { text: "China", correct: true },
                { text: "Indonesia", correct: false }
            ]
        },
        {
            question: "How many sides does a hexagon have?",
            answers: [
                { text: "4", correct: false },
                { text: "5", correct: false },
                { text: "6", correct: true },
                { text: "7", correct: false }
            ]
        },
        {
            question: "Which of these is not a fruit?",
            answers: [
                { text: "Tomato", correct: false },
                { text: "Pumpkin", correct: true },
                { text: "Cucumber", correct: false },
                { text: "Pepper", correct: false }
            ]
        },
        {
            question: "What is the capital of Canada?",
            answers: [
                { text: "Toronto", correct: false },
                { text: "Vancouver", correct: false },
                { text: "Ottawa", correct: true },
                { text: "Montreal", correct: false }
            ]
        },
        {
            question: "Which scientist developed the theory of relativity?",
            answers: [
                { text: "Isaac Newton", correct: false },
                { text: "Albert Einstein", correct: true },
                { text: "Stephen Hawking", correct: false },
                { text: "Galileo Galilei", correct: false }
            ]
        },
        {
            question: "What is the chemical symbol for gold?",
            answers: [
                { text: "Go", correct: false },
                { text: "Gd", correct: false },
                { text: "Au", correct: true },
                { text: "Ag", correct: false }
            ]
        },
        {
            question: "Which country is shaped like a boot?",
            answers: [
                { text: "Greece", correct: false },
                { text: "Italy", correct: true },
                { text: "Spain", correct: false },
                { text: "Portugal", correct: false }
            ]
        },
        {
            question: "How many players are on a baseball team?",
            answers: [
                { text: "7", correct: false },
                { text: "9", correct: true },
                { text: "11", correct: false },
                { text: "13", correct: false }
            ]
        },
        {
            question: "Which of these is not a mammal?",
            answers: [
                { text: "Dolphin", correct: false },
                { text: "Bat", correct: false },
                { text: "Shark", correct: true },
                { text: "Whale", correct: false }
            ]
        },
        {
            question: "What is the largest country by area?",
            answers: [
                { text: "China", correct: false },
                { text: "United States", correct: false },
                { text: "Canada", correct: false },
                { text: "Russia", correct: true }
            ]
        },
        {
            question: "Which planet is known for its rings?",
            answers: [
                { text: "Jupiter", correct: false },
                { text: "Saturn", correct: true },
                { text: "Uranus", correct: false },
                { text: "Neptune", correct: false }
            ]
        },
        {
            question: "What is the capital of Egypt?",
            answers: [
                { text: "Alexandria", correct: false },
                { text: "Cairo", correct: true },
                { text: "Luxor", correct: false },
                { text: "Giza", correct: false }
            ]
        },
        {
            question: "Which of these is not a type of cloud?",
            answers: [
                { text: "Cumulus", correct: false },
                { text: "Stratus", correct: false },
                { text: "Nimbus", correct: false },
                { text: "Flatus", correct: true }
            ]
        },
        {
            question: "How many colors are in a rainbow?",
            answers: [
                { text: "5", correct: false },
                { text: "6", correct: false },
                { text: "7", correct: true },
                { text: "8", correct: false }
            ]
        },
        {
            question: "Which of these is not a planet in our solar system?",
            answers: [
                { text: "Mercury", correct: false },
                { text: "Venus", correct: false },
                { text: "Pluto", correct: true },
                { text: "Mars", correct: false }
            ]
        },
        {
            question: "What is the capital of Australia?",
            answers: [
                { text: "Sydney", correct: false },
                { text: "Melbourne", correct: false },
                { text: "Canberra", correct: true },
                { text: "Brisbane", correct: false }
            ]
        },
        {
            question: "Which of these is not a US state?",
            answers: [
                { text: "Alabama", correct: false },
                { text: "Toronto", correct: true },
                { text: "Alaska", correct: false },
                { text: "Arizona", correct: false }
            ]
        }
    ];
    
    // Initialize the quiz
    function initQuiz() {
        currentQuestion = 0;
        score = 0;
        timeLeft = 600; // 10 minutes
        userAnswers = new Array(questions.length).fill(null);
        
        scoreDisplay.textContent = score;
        updateTimeDisplay();
        
        startTimer();
        showQuestion();
        
        submitButton.classList.remove('hide');
        retryButton.classList.add('hide');
        resultsContainer.className = '';
        resultsContainer.style.display = 'none';
    }
    
    // Update time display in minutes:seconds format
    function updateTimeDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    
    // Start the timer
    function startTimer() {
        clearInterval(timer);
        timer = setInterval(() => {
            timeLeft--;
            updateTimeDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                submitQuiz();
            }
        }, 1000);
    }
    
    // Display the current question
    function showQuestion() {
        const question = questions[currentQuestion];
        
        const questionHTML = `
            <div class="question">${currentQuestion + 1}. ${question.question}</div>
            <div class="answers">
                ${question.answers.map((answer, index) => `
                    <label class="answer ${userAnswers[currentQuestion] === index ? 'selected' : ''}">
                        <input type="radio" name="answer" value="${index}" 
                            ${userAnswers[currentQuestion] === index ? 'checked' : ''}>
                        ${answer.text}
                    </label>
                `).join('')}
            </div>
            <div class="navigation">
                ${currentQuestion > 0 ? '<button class="nav-btn prev-btn">Previous</button>' : ''}
                ${currentQuestion < questions.length - 1 ? '<button class="nav-btn next-btn">Next</button>' : ''}
            </div>
        `;
        
        quizContainer.innerHTML = questionHTML;
        
        // Add event listeners to answer choices
        const answerElements = document.querySelectorAll('.answer');
        answerElements.forEach(answer => {
            answer.addEventListener('click', () => {
                answerElements.forEach(a => a.classList.remove('selected'));
                answer.classList.add('selected');
                const selectedIndex = parseInt(answer.querySelector('input').value);
                userAnswers[currentQuestion] = selectedIndex;
            });
        });
        
        // Navigation buttons
        if (document.querySelector('.prev-btn')) {
            document.querySelector('.prev-btn').addEventListener('click', () => {
                currentQuestion--;
                showQuestion();
            });
        }
        
        if (document.querySelector('.next-btn')) {
            document.querySelector('.next-btn').addEventListener('click', () => {
                currentQuestion++;
                showQuestion();
            });
        }
    }
    
    // Submit the quiz
    function submitQuiz() {
        clearInterval(timer);
        
        // Calculate score
        score = 0;
        userAnswers.forEach((answerIndex, questionIndex) => {
            if (answerIndex !== null && questions[questionIndex].answers[answerIndex].correct) {
                score++;
            }
        });
        
        // Display results
        const percentage = Math.round((score / questions.length) * 100);
        let resultClass = '';
        let message = '';
        
        if (percentage >= 80) {
            resultClass = 'good';
            message = `Excellent! You scored ${score} out of ${questions.length} (${percentage}%)`;
        } else if (percentage >= 50) {
            resultClass = 'average';
            message = `Good try! You scored ${score} out of ${questions.length} (${percentage}%)`;
        } else {
            resultClass = 'bad';
            message = `Keep practicing! You scored ${score} out of ${questions.length} (${percentage}%)`;
        }
        
        resultsContainer.className = resultClass;
        resultsContainer.innerHTML = `<h3>Quiz Completed!</h3><p>${message}</p>`;
        resultsContainer.style.display = 'block';
        
        scoreDisplay.textContent = score;
        submitButton.classList.add('hide');
        retryButton.classList.remove('hide');
    }
    
    // Event listeners
    submitButton.addEventListener('click', submitQuiz);
    retryButton.addEventListener('click', initQuiz);
    
    // Initialize the quiz
    initQuiz();
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' && currentQuestion < questions.length - 1) {
            currentQuestion++;
            showQuestion();
        } else if (e.key === 'ArrowLeft' && currentQuestion > 0) {
            currentQuestion--;
            showQuestion();
        }
    });
});