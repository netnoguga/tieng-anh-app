import React, { useState } from 'react';

const questions = [
  {
    id: 1,
    question: "She ____ to the cinema yesterday.",
    options: ["go", "goes", "went", "gone"],
    answer: "went"
  },
  {
    id: 2,
    question: "I have been learning English ____ 5 years.",
    options: ["for", "since", "at", "in"],
    answer: "for"
  }
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerOptionClick = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '600px', margin: 'auto' }}>
      <h1>Ôn Thi Tiếng Anh Online</h1>
      
      {showScore ? (
        <div style={{ textAlign: 'center' }}>
          <h2>Bạn đã hoàn thành!</h2>
          <p>Số câu đúng: {score} / {questions.length}</p>
          <button onClick={resetQuiz} style={buttonStyle}>Làm lại</button>
        </div>
      ) : (
        <div>
          <h3>Câu hỏi {currentQuestion + 1}/{questions.length}</h3>
          <p style={{ fontSize: '1.2rem' }}>{questions[currentQuestion].question}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {questions[currentQuestion].options.map((option, index) => (
              <button 
                key={index} 
                onClick={() => handleAnswerOptionClick(option)}
                style={buttonStyle}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px'
};

export default App;