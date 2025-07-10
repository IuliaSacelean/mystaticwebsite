const questions = [
    {
      question: "What does QA stand for?",
      answers: ["Quick Access", "Quality Assurance", "Query Analysis", "Qualified Agent"],
      correct: 1
    },
    {
      question: "Which type of testing checks existing functionality?",
      answers: ["Regression", "Smoke", "Unit", "Load"],
      correct: 0
    },
    {
      question: "True or False: Unit tests are written by testers.",
      answers: ["True", "False"],
      correct: 1
    },
    {
      question: "What is the goal of smoke testing?",
      answers: ["Test performance", "Check basic functionality", "Find security flaws", "Test UI design"],
      correct: 1
    },
    {
      question: "Which of these is a non-functional test?",
      answers: ["Usability", "Unit", "Integration", "Acceptance"],
      correct: 0
    },
    {
      question: "What does CI stand for in DevOps?",
      answers: ["Code Injection", "Continuous Integration", "Critical Inspection", "Code Isolation"],
      correct: 1
    },
    {
      question: "Which tool is commonly used for test automation?",
      answers: ["Jira", "Selenium", "Slack", "Figma"],
      correct: 1
    },
    {
      question: "True or False: Exploratory testing is random.",
      answers: ["True", "False"],
      correct: 1
    },
    {
      question: "What is a flaky test?",
      answers: ["A test that always fails", "A test that fails intermittently", "A test that never runs", "A test with no assertions"],
      correct: 1
    },
    {
      question: "What is the purpose of a test case?",
      answers: ["To write code", "To track bugs", "To define test steps and expected results", "To deploy software"],
      correct: 2
    },
    {
      question: "Which of these is a bug severity level?",
      answers: ["Critical", "Optional", "Routine", "Minority"],
      correct: 0
    },
    {
      question: "What is the first step in the QA process?",
      answers: ["Test execution", "Requirement analysis", "Bug reporting", "Code review"],
      correct: 1
    },
    {
      question: "Which testing is done without knowing internal code?",
      answers: ["White-box", "Black-box", "Unit", "Integration"],
      correct: 1
    },
    {
      question: "What is a test plan?",
      answers: ["A list of bugs", "A document outlining testing strategy", "A code snippet", "A UI design"],
      correct: 1
    },
    {
      question: "True or False: Load testing checks how software performs under stress.",
      answers: ["True", "False"],
      correct: 0
    },
    {
      question: "Which of these is a test management tool?",
      answers: ["Jira", "Postman", "TestRail", "GitHub"],
      correct: 2
    },
    {
      question: "What does TDD stand for?",
      answers: ["Test-Driven Development", "Technical Data Design", "Tool-Driven Debugging", "Test Design Document"],
      correct: 0
    },
    {
      question: "Which testing type is best for early bug detection?",
      answers: ["Acceptance", "System", "Unit", "Beta"],
      correct: 2
    },
    {
      question: "What is a test suite?",
      answers: ["A group of related test cases", "A bug report", "A code repository", "A UI mockup"],
      correct: 0
    },
    {
      question: "Which of these is NOT a QA responsibility?",
      answers: ["Writing test cases", "Fixing production code", "Reporting bugs", "Running test scripts"],
      correct: 1
    },
    {
      question: "What is the purpose of acceptance testing?",
      answers: ["To test performance", "To verify business requirements", "To write code", "To design UI"],
      correct: 1
    },
    {
      question: "True or False: QA is only needed at the end of development.",
      answers: ["True", "False"],
      correct: 1
    }
  ];
  
  
  let current = 0;
  let score = 0;
  
  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const scoreEl = document.getElementById("score");
  
  function showQuestion() {
    if (current >= questions.length) {
      endGame();
      return;
    }
  
    const q = questions[current];
    questionEl.textContent = q.question;
    answersEl.innerHTML = "";
  
    q.answers.forEach((answer, i) => {
      const btn = document.createElement("button");
      btn.textContent = answer;
      btn.classList.add("answer-btn");
      btn.onclick = () => handleAnswer(btn, i === q.correct, q.correct);
      answersEl.appendChild(btn);
    });
  }
  
  function handleAnswer(button, isCorrect, correctIndex) {
    const buttons = document.querySelectorAll(".answer-btn");
  
    buttons.forEach((btn, index) => {
      btn.disabled = true;
      if (index === correctIndex) {
        btn.classList.add("correct");
      }
    });
  
    if (!isCorrect) {
      button.classList.add("incorrect");
    } else {
      score++;
    }
  
    setTimeout(() => {
      current++;
      showQuestion();
    }, 1000);
  }
  
  function endGame() {
    questionEl.textContent = "Awesome! You've completed the quiz!";
    answersEl.innerHTML = "";
    scoreEl.textContent = `Your score is: ${score}/${questions.length}`;
    scoreEl.style.fontSize = "44px";
  }
  
  showQuestion();
  