import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';

function Admin() {
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({ question: '', options: '', answer: '' });

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "questions"), (snap) => {
      setQuestions(snap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
    return () => unsub();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "questions"), {
        question: form.question,
        options: form.options.split(',').map(o => o.trim()),
        answer: form.answer.trim()
      });
      setForm({ question: '', options: '', answer: '' }); // Sửa lỗi scope ở đây
      alert("Thành công!");
    } catch (err) { alert("Lỗi: " + err.message); }
  };

  return (
    <div style={{padding: '20px'}}>
      <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
        <input placeholder="Câu hỏi" value={form.question} onChange={e => setForm({...form, question: e.target.value})} required />
        <input placeholder="Đáp án (cách nhau dấu phẩy)" value={form.options} onChange={e => setForm({...form, options: e.target.value})} required />
        <input placeholder="Đáp án đúng" value={form.answer} onChange={e => setForm({...form, answer: e.target.value})} required />
        <button type="submit">Lưu</button>
      </form>
      <hr />
      {questions.map(q => (
        <div key={q.id} style={{display: 'flex', justifyContent: 'space-between', padding: '5px'}}>
          <span>{q.question}</span>
          <button onClick={() => deleteDoc(doc(db, "questions", q.id))} style={{color: 'red'}}>Xóa</button>
        </div>
      ))}
    </div>
  );
}

export default Admin;