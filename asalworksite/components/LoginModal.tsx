
import React, { useState } from 'react';

interface LoginModalProps {
  onLogin: () => void;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onLogin, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'mahnaz' && password === 'Mahnaz22') {
      onLogin();
    } else {
      setError('اطلاعات ورود نامعتبر است.');
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 animate-in fade-in duration-300">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-[3rem] overflow-hidden flex flex-col shadow-2xl p-10">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-zinc-800 rounded-[2rem] flex items-center justify-center text-3xl mx-auto mb-6 shadow-2xl border border-zinc-700 transition-transform hover:scale-105 duration-500">
            🗝️
          </div>
          <h2 className="text-2xl font-black text-zinc-100 tracking-tighter">احراز هویت مدیر</h2>
          <p className="text-[11px] text-zinc-400 mt-3 font-black uppercase tracking-tighter">Secure Access Protocol</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] text-zinc-100 font-black uppercase tracking-tighter">شناسه کاربری</label>
            <input 
              type="text"
              className="w-full bg-zinc-800/50 border border-zinc-800 rounded-2xl p-4 text-sm text-zinc-100 font-black focus:border-zinc-600 outline-none transition-all placeholder:text-zinc-600"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
              placeholder="Username"
              dir="ltr"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] text-zinc-100 font-black uppercase tracking-tighter">کد امنیتی</label>
            <input 
              type="password"
              className="w-full bg-zinc-800/50 border border-zinc-800 rounded-2xl p-4 text-sm text-zinc-100 font-black focus:border-zinc-600 outline-none transition-all placeholder:text-zinc-600"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="••••••••"
              dir="ltr"
            />
          </div>

          {error && (
            <div className="bg-red-950/20 border border-red-900/50 p-3 rounded-xl">
              <p className="text-red-500 text-[11px] text-center font-black uppercase tracking-tighter">{error}</p>
            </div>
          )}

          <div className="flex flex-col gap-3 pt-4">
            <button 
              type="submit"
              className="w-full bg-zinc-100 hover:bg-white text-zinc-950 py-5 rounded-2xl text-[12px] font-black uppercase tracking-tighter shadow-2xl transition-all transform active:scale-95 border-b-4 border-zinc-300"
            >
              تایید و ورود به پنل
            </button>
            <button 
              type="button"
              onClick={onClose}
              className="w-full bg-zinc-900 hover:bg-zinc-800 text-zinc-100 py-5 rounded-2xl text-[12px] font-black uppercase border border-zinc-800 tracking-tighter transition-all"
            >
              بازگشت به سایت
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
