import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

function Admin() {
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({ question: '', options: '', answer: '' });

  const fetchQuestions = async () => {
    const data = await getDocs(collection(db, "questions"));
    setQuestions(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => { fetchQuestions(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.question || !form.options || !form.answer) return alert("Vui lòng nhập đủ!");
    
    await addDoc(collection(db, "questions"), {
      question: form.question,
      options: form.options.split(',').map(item => item.trim()),
      answer: form.answer.trim()
    });
    setForm({ question: '', options: '', answer: '' });
    fetchQuestions();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xóa câu này?")) {
      await deleteDoc(doc(db, "questions", id));
      fetchQuestions();
    }
  };

  return (
    <div>
      <h2>Trang Quản Trị</h2>
      <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px', padding: '15px', background: '#f4f4f4' }}>
        <input placeholder="Câu hỏi" value={form.question} onChange={e => setForm({...form, question: e.target.value})} />
        <input placeholder="4 đáp án (cách nhau bằng dấu phẩy)" value={form.options} onChange={e => setForm({...form, options: e.target.value})} />
        <input placeholder="Đáp án đúng" value={form.answer} onChange={e => setForm({...form, answer: e.target.value})} />
        <button type="submit" style={{ background: 'blue', color: 'white', padding: '10px' }}>Thêm câu hỏi</button>
      </form>

      <h3>Danh sách câu hỏi hiện có:</h3>
      {questions.map(q => (
        <div key={q.id} style={{ borderBottom: '1px solid #ccc', padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
          <span>{q.question}</span>
          <button onClick={() => handleDelete(q.id)} style={{ color: 'red' }}>Xóa</button>
        </div>
      ))}
    </div>
  );
}
// Sau khi addDoc thành công:
setForm({ question: '', options: '', answer: '' });
alert("Thêm câu hỏi thành công!");
export default Admin;