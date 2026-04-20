import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function Quiz() {
  const [questions, setQuestions] = useState([]); // Khởi tạo mảng rỗng chuẩn
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getDocs(collection(db, "questions"));
        setQuestions(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error);
      }
    };
    fetchQuestions();
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