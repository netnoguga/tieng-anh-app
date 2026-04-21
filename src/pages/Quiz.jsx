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

  const handleAnswer = (opt) => {
    if (opt === questions[currentIdx]?.answer) setScore(score + 1);
    if (currentIdx + 1 < questions.length) setCurrentIdx(currentIdx + 1);
    else setFinished(true);
  };

  if (questions.length === 0) return <div style={{textAlign: 'center', padding: '50px'}}>Đang tải câu hỏi...</div>;

  const currentQ = questions[currentIdx];

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {finished ? (
        <h2>Kết quả: {score}/{questions.length}</h2>
      ) : (
        <div>
          <h3>Câu {currentIdx + 1}: {currentQ?.question}</h3>
          <div style={{ display: 'grid', gap: '10px', marginTop: '20px' }}>
            {currentQ?.options?.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(opt)} style={btnStyle}>{opt}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const btnStyle = { padding: '10px', cursor: 'pointer', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px' };
export default Quiz;