import React, { useState, useEffect } from 'react';

export default function TaskForm({ onAdd, editing, onUpdate, onCancel }){
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  useEffect(()=>{ if (editing){ setTitle(editing.title || ''); setDescription(editing.description || ''); } else { setTitle(''); setDescription(''); } }, [editing]);
  const submit = (e) =>{
    e.preventDefault();
    if (!title) return alert('Title required');
    if (editing) onUpdate({ ...editing, title, description }); else onAdd({ title, description });
    setTitle(''); setDescription('');
  }
  return (
    <form className="task-form" onSubmit={submit}>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Task title"/>
      <input value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description (optional)"/>
      <button type="submit">{editing ? 'Update' : 'Add'}</button>
      {editing && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
}
