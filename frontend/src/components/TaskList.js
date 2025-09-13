import React from 'react';

export default function TaskList({ tasks, onToggle, onEdit, onDelete }){
  return (
    <div className="task-list">
      {tasks.length === 0 ? <p>No tasks</p> : (
        tasks.map(t => (
          <div key={t._id} className={`task ${t.completed ? 'done' : ''}`}>
            <div className="left">
              <input type="checkbox" checked={t.completed} onChange={()=>onToggle(t)} />
              <div>
                <div className="title">{t.title}</div>
                {t.description && <div className="desc">{t.description}</div>}
              </div>
            </div>
            <div className="actions">
              <button onClick={()=>onEdit(t)}>Edit</button>
              <button onClick={()=>onDelete(t)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
