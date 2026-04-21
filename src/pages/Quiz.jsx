import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "questions"), (snap) => {
      setQuestions(snap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
    return () => unsub();
  }, []);

  // --- HÀM LÀM LẠI CÂU HỎI ---
  const handleRestart = () => {
    setCurrentIdx(0); // Quay về câu 1
    setScore(0);      // Reset điểm về 0
    setFinished(false); // Tắt màn hình kết quả để hiện lại câu hỏi
  };

  const handleAnswer = (opt) => {
    if (opt === questions[currentIdx]?.answer) {
      setScore(score + 1);
    }
    
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setFinished(true);
    }
  };

  if (questions.length === 0) return <div style={{textAlign: 'center', padding: '50px', color: 'white'}}>Đang tải đề thi...</div>;

  const currentQ = questions[currentIdx];

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>
      {finished ? (
        <div style={resultBoxStyle}>
          <h2 style={{ fontSize: '2rem', color: '#00d4ff' }}>🎉 Hoàn thành!</h2>
          <p style={{ fontSize: '1.5rem' }}>Điểm của bạn: <span style={{color: '#00ff00'}}>{score}</span> / {questions.length}</p>
          
          {/* NÚT LÀM LẠI */}
          <button onClick={handleRestart} style={restartBtnStyle}>
            🔄 Làm lại bài thi
          </button>
        </div>
      ) : (
        <div style={quizContainerStyle}>
          <h2 style={{color: '#aaa'}}>Câu {currentIdx + 1} / {questions.length}</h2>
          <h3 style={{ fontSize: '1.8rem', margin: '30px 0' }}>{currentQ?.question}</h3>
          
          <div style={{ display: 'grid', gap: '15px', maxWidth: '600px', margin: 'auto' }}>
            {currentQ?.options?.map((opt, i) => (
              <button 
                key={i} 
                onClick={() => handleAnswer(opt)} 
                style={answerBtnStyle}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// --- CSS NÂNG CẤP CHO ĐẸP ---
const quizContainerStyle = { padding: '20px', borderRadius: '15px', background: '#1e1e1e', boxShadow: '0 0 20px rgba(0,0,0,0.5)' };
const resultBoxStyle = { padding: '40px', background: '#222', borderRadius: '20px', border: '2px solid #00d4ff' };

const answerBtnStyle = {
  padding: '15px',
  fontSize: '1.1rem',
  cursor: 'pointer',
  background: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  transition: '0.3s',
  textAlign: 'left'
};

const restartBtnStyle = {
  marginTop: '20px',
  padding: '12px 30px',
  fontSize: '1.2rem',
  background: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '50px',
  cursor: 'pointer',
  fontWeight: 'bold',
  boxShadow: '0 4px 15px rgba(40, 167, 69, 0.4)'
};

export default Quiz;