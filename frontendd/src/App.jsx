import React, { useEffect, useState } from 'react';
import AuthForm from './components/AuthForm';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { getTasks, addTask, updateTask, deleteTask } from './api';

export default function App(){
  const [authed, setAuthed] = useState(!!localStorage.getItem('token'));
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = async ()=>{
    try{
      const data = await getTasks();
      setTasks(data);
    }catch(err){
      console.error(err);
      setTasks([]);
    }
  }

  useEffect(()=>{ if (authed) load(); }, [authed]);

  const handleAdd = async (payload) =>{
    const t = await addTask(payload);
    setTasks(prev => [t, ...prev]);
  }
  const handleUpdate = async (payload) =>{
    const t = await updateTask(payload._id, payload);
    setTasks(prev => prev.map(p => p._id === t._id ? t : p));
    setEditing(null);
  }
  const handleToggle = async (task) =>{
    const t = await updateTask(task._id, { completed: !task.completed });
    setTasks(prev => prev.map(p => p._id === t._id ? t : p));
  }
  const handleDelete = async (task) =>{
    await deleteTask(task._id);
    setTasks(prev => prev.filter(p => p._1d !== task._id && p._id !== task._id));
  }

  if (!authed) return <AuthForm onAuth={()=>setAuthed(true)} />;

  return (
    <div className="app">
      <header>
        <h1>Task Manager</h1>
        <div>
          <button onClick={()=>{ localStorage.removeItem('token'); setAuthed(false); }}>Logout</button>
        </div>
      </header>

      <main>
        <TaskForm onAdd={handleAdd} editing={editing} onUpdate={handleUpdate} onCancel={()=>setEditing(null)} />
        <TaskList tasks={tasks} onToggle={handleToggle} onEdit={setEditing} onDelete={handleDelete} />
      </main>
    </div>
  );
}
