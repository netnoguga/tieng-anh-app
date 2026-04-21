import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';

function Admin() {
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({ question: '', options: '', answer: '' });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "questions"), (snapshot) => {
      setQuestions(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
    return () => unsubscribe();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "questions"), {
        question: form.question,
        options: form.options.split(',').map(opt => opt.trim()),
        answer: form.answer.trim()
      });
      setForm({ question: '', options: '', answer: '' });
      alert("Đã thêm câu hỏi!");
    } catch (err) { alert("Lỗi: " + err.message); }
  };

  return (
    <div>
      <h2>Quản trị đề thi</h2>
      <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input placeholder="Câu hỏi" value={form.question} onChange={e => setForm({...form, question: e.target.value})} required />
        <input placeholder="Các đáp án (cách nhau bằng dấu phẩy)" value={form.options} onChange={e => setForm({...form, options: e.target.value})} required />
        <input placeholder="Đáp án đúng (viết y hệt 1 trong các đáp án trên)" value={form.answer} onChange={e => setForm({...form, answer: e.target.value})} required />
        <button type="submit">Lưu câu hỏi</button>
      </form>
      <hr />
      {questions.map(q => (
        <div key={q.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ccc' }}>
          <span>{q.question}</span>
          <button onClick={() => deleteDoc(doc(db, "questions", q.id))} style={{ color: 'red' }}>Xóa</button>
        </div>
      ))}
    </div>
  );
}

export default Admin;