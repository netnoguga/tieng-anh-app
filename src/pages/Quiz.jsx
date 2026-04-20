import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getQuestions = async () => {
      const data = await getDocs(collection(db, "questions"));
      setQuestions(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    };
    getQuestions();
  }, []);

  const handleAnswer = (selected) => {
    if (selected === questions[currentQuestion].answer) setScore(score + 1);
    const next = currentQuestion + 1;
    if (next < questions.length) setCurrentQuestion(next);
    else setShowScore(true);
  };

  if (loading) return <h2>Đang tải câu hỏi...</h2>;
  if (questions.length === 0) return <h2>Chưa có câu hỏi nào trong hệ thống.</h2>;

  return (
    <div>
      {showScore ? (
        <div style={{ textAlign: 'center' }}>
          <h2>Kết quả: {score}/{questions.length}</h2>
          <button onClick={() => window.location.reload()} style={btnStyle}>Làm lại</button>
        </div>
      ) : (
        <div>
          <h3>Câu {currentQuestion + 1}: {questions[currentQuestion].question}</h3>
          <div style={{ display: 'grid', gap: '10px' }}>
            {questions[currentQuestion].options.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(opt)} style={btnStyle}>{opt}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const btnStyle = { padding: '12px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' };

export default Quiz;