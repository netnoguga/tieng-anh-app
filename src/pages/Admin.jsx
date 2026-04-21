// src/pages/Admin.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore'; // Đã thêm onSnapshot vào đây

function Admin() {
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({ question: '', options: '', answer: '' });

  useEffect(() => {
    // Lấy dữ liệu thực tế từ Firebase
    const unsub = onSnapshot(collection(db, "questions"), (snap) => {
      setQuestions(snap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
    return () => unsub();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Đưa dữ liệu lên Firebase
      await addDoc(collection(db, "questions"), {
        question: form.question,
        options: form.options.split(',').map(o => o.trim()),
        answer: form.answer.trim()
      });
      
      // Reset form sau khi thêm thành công
      setForm({ question: '', options: '', answer: '' }); 
      alert("Thêm câu hỏi thành công!");
    } catch (err) {
      alert("Lỗi khi thêm: " + err.message);
    }
  };

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h2>Trang Quản Trị</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <input style={inputStyle} placeholder="Câu hỏi" value={form.question} onChange={e => setForm({...form, question: e.target.value})} required />
        <input style={inputStyle} placeholder="Đáp án (cách nhau bằng dấu phẩy)" value={form.options} onChange={e => setForm({...form, options: e.target.value})} required />
        <input style={inputStyle} placeholder="Đáp án đúng" value={form.answer} onChange={e => setForm({...form, answer: e.target.value})} required />
        <button type="submit" style={btnSubmitStyle}>Thêm câu hỏi</button>
      </form>
      <hr />
      <h3>Danh sách câu hỏi hiện có:</h3>
      {questions.map(q => (
        <div key={q.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span>{q.question}</span>
          <button onClick={() => deleteDoc(doc(db, "questions", q.id))} style={{ color: 'red', cursor: 'pointer' }}>Xóa</button>
        </div>
      ))}
    </div>
  );
}

const inputStyle = { padding: '10px', borderRadius: '5px', border: '1px solid #ccc' };
const btnSubmitStyle = { padding: '10px', background: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };

export default Admin;