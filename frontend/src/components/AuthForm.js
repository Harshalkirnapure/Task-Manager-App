import React, { useState } from 'react';
import { authLogin, authRegister } from '../api';

export default function AuthForm({ onAuth }){
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    try{
      const resp = isLogin ? await authLogin({ email: form.email, password: form.password }) : await authRegister(form);
      localStorage.setItem('token', resp.token);
      onAuth();
    }catch(err){
      alert(err.msg || 'Auth error');
    }
  }
  return (
    <div className="auth">
      <h2>{isLogin ? 'Login' : 'Sign up'}</h2>
      <form onSubmit={submit}>
        {!isLogin && <input name="name" placeholder="Name" value={form.name} onChange={handle} required />}
        <input name="email" placeholder="Email" value={form.email} onChange={handle} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handle} required />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <small onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer',color: '#007bff', }}>{isLogin ? 'Need account? Sign up' : 'Have an account? Login'}</small>
    </div>
  );
}
