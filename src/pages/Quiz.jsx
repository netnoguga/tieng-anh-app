import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "questions"), (snapshot) => {
      setQuestions(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
    return () => unsubscribe();
  }, []);

  const handleAnswer = (selected) => {
    if (selected === questions[currentQuestion]?.answer) setScore(score + 1);
    const next = currentQuestion + 1;
    if (next < questions.length) setCurrentQuestion(next);
    else setShowScore(true);
  };

  if (questions.length === 0) return <h2 style={{textAlign: 'center'}}>Đang tải câu hỏi...</h2>;

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {showScore ? (
        <div>
          <h2>Hoàn thành! Điểm của bạn: {score}/{questions.length}</h2>
          <button onClick={() => window.location.reload()} style={btnStyle}>Thi lại</button>
        </div>
      ) : (
        <div>
          <h3>Câu {currentQuestion + 1}: {questions[currentQuestion]?.question}</h3>
          <div style={{ display: 'grid', gap: '10px', marginTop: '20px' }}>
            {questions[currentQuestion]?.options?.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(opt)} style={btnStyle}>{opt}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const btnStyle = { padding: '12px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' };

export default Quiz;