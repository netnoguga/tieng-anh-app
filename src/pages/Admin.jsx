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
    if (!form.question || !form.options || !form.answer) return alert("Vui lòng nhập đủ thông tin!");
    
    try {
      await addDoc(collection(db, "questions"), {
        question: form.question,
        options: form.options.split(',').map(item => item.trim()),
        answer: form.answer.trim()
      });
      
      // SỬA LỖI: Để trong hàm handleAdd
      setForm({ question: '', options: '', answer: '' });
      alert("Thêm câu hỏi thành công!");
      fetchQuestions();
    } catch (err) {
      alert("Lỗi khi thêm: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xóa câu này?")) {
      await deleteDoc(doc(db, "questions", id));
      fetchQuestions();
    }
  };

  return (
    <div>
      <h2 style={{textAlign: 'center'}}>Quản Lý Đề Thi</h2>
      <form onSubmit={handleAdd} style={formStyle}>
        <input style={inputStyle} placeholder="Câu hỏi" value={form.question} onChange={e => setForm({...form, question: e.target.value})} />
        <input style={inputStyle} placeholder="Các đáp án (cách nhau bởi dấu phẩy)" value={form.options} onChange={e => setForm({...form, options: e.target.value})} />
        <input style={inputStyle} placeholder="Đáp án đúng" value={form.answer} onChange={e => setForm({...form, answer: e.target.value})} />
        <button type="submit" style={{ ...btnStyle, backgroundColor: '#28a745' }}>Lưu lên Firebase</button>
      </form>

      <hr />
      <h3>Danh sách câu hỏi ({questions.length})</h3>
      {questions?.map(q => (
        <div key={q.id} style={{ borderBottom: '1px solid #ddd', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{q.question}</span>
          <button onClick={() => handleDelete(q.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Xóa</button>
        </div>
      ))}
    </div>
  );
}

const formStyle = { display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', background: '#f9f9f9', borderRadius: '10px' };
const inputStyle = { padding: '10px', borderRadius: '5px', border: '1px solid #ccc' };
const btnStyle = { padding: '12px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '8px' };

export default Admin;