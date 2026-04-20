import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    // onSnapshot sẽ "lắng nghe" Database. 
    // Hễ Admin thêm câu mới là nó tự đẩy về đây ngay lập tức.
    const unsubscribe = onSnapshot(collection(db, "questions"), (snapshot) => {
      const liveData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setQuestions(liveData);
    });

    // Cleanup function để ngắt kết nối khi không dùng nữa
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
          <h2>Kết quả: {score}/{questions.length}</h2>
          <button onClick={() => window.location.reload()} style={btnStyle}>Làm lại</button>
        </div>
      ) : (
        <div>
          <h3>Câu {currentQuestion + 1}: {questions[currentQuestion]?.question}</h3>
          <div style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
            {questions[currentQuestion]?.options?.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(opt)} style={btnStyle}>{opt}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const btnStyle = { padding: '15px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px' };

export default Quiz;