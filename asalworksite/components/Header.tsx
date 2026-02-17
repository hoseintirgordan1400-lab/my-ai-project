
import React, { useState } from 'react';
import { SiteInfo } from '../types';

interface HeaderProps {
  info: SiteInfo;
  onEdit?: (info: SiteInfo) => void;
}

const Header: React.FC<HeaderProps> = ({ info, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempInfo, setTempInfo] = useState(info);

  const handleSave = () => {
    if (onEdit) {
      onEdit(tempInfo);
      setIsEditing(false);
    }
  };

  return (
    <div className="relative bg-zinc-900 p-12 border-b border-zinc-800/60">
      <div className="flex flex-col items-center text-center space-y-8">
        <div className="w-28 h-28 rounded-[2.5rem] bg-zinc-800 flex items-center justify-center text-5xl shadow-2xl border border-zinc-700/50 group transition-all hover:border-zinc-600">
          <span className="opacity-100 group-hover:scale-110 transition-transform">🏠</span>
        </div>
        
        {!isEditing ? (
          <>
            <div className="space-y-3">
              <h1 className="text-4xl font-black text-zinc-100 tracking-tighter">{info.name}</h1>
              <div className="w-12 h-1 bg-orange-400 mx-auto rounded-full"></div>
            </div>
            <p className="text-zinc-200 text-[15px] max-w-sm leading-relaxed font-bold">{info.description}</p>
            
            <div className="flex flex-wrap justify-center gap-3">
               <a 
                 href={`tel:${info.phone}`}
                 className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-5 py-3 rounded-2xl text-[11px] font-black tracking-tighter border border-zinc-700 flex items-center gap-2 transition-all"
               >
                 <span>📞</span>
                 تماس
               </a>
               <a 
                 href={`https://wa.me/${info.whatsapp}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-5 py-3 rounded-2xl text-[11px] font-black tracking-tighter border border-zinc-700 flex items-center gap-2 transition-all"
               >
                 <span>💬</span>
                 واتساپ
               </a>
               <a 
                 href={`https://instagram.com/${info.instagram}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-5 py-3 rounded-2xl text-[11px] font-black tracking-tighter border border-zinc-700 flex items-center gap-2 transition-all"
               >
                 <span>📸</span>
                 اینستاگرام
               </a>
               <a 
                 href={info.website?.startsWith('http') ? info.website : `https://${info.website}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-5 py-3 rounded-2xl text-[11px] font-black tracking-tighter border border-zinc-700 flex items-center gap-2 transition-all"
               >
                 <span>🌐</span>
                 سایت
               </a>
            </div>

            <div className="flex flex-col gap-3 text-zinc-100 text-[12px] font-black tracking-tighter uppercase pt-4">
              <span className="flex items-center justify-center gap-3">
                <span className="opacity-100 text-lg">📍</span>
                {info.address}
              </span>
            </div>

            {onEdit && (
              <button 
                onClick={() => setIsEditing(true)}
                className="mt-6 text-[11px] text-zinc-100 hover:text-orange-400 transition-colors uppercase tracking-tighter font-black"
              >
                ویرایش اطلاعات مجموعه
              </button>
            )}
          </>
        ) : (
          <div className="w-full space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <div className="grid grid-cols-1 gap-4">
              <input 
                className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl p-5 text-sm text-zinc-100 font-bold focus:border-zinc-500 outline-none transition-all placeholder:text-zinc-500"
                value={tempInfo.name}
                onChange={(e) => setTempInfo({...tempInfo, name: e.target.value})}
                placeholder="نام مجموعه"
              />
              <textarea 
                className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl p-5 text-sm text-zinc-100 font-bold focus:border-zinc-500 outline-none min-h-[120px] placeholder:text-zinc-500"
                value={tempInfo.description}
                onChange={(e) => setTempInfo({...tempInfo, description: e.target.value})}
                placeholder="توضیحات برند"
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl p-5 text-sm text-zinc-100 font-bold focus:border-zinc-500 outline-none placeholder:text-zinc-500"
                  value={tempInfo.phone}
                  onChange={(e) => setTempInfo({...tempInfo, phone: e.target.value})}
                  placeholder="شماره تماس"
                />
                <input 
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl p-5 text-sm text-zinc-100 font-bold focus:border-zinc-500 outline-none placeholder:text-zinc-500"
                  value={tempInfo.whatsapp}
                  onChange={(e) => setTempInfo({...tempInfo, whatsapp: e.target.value})}
                  placeholder="واتساپ (مثلاً 98912...)"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl p-5 text-sm text-zinc-100 font-bold focus:border-zinc-500 outline-none placeholder:text-zinc-500"
                  value={tempInfo.instagram}
                  onChange={(e) => setTempInfo({...tempInfo, instagram: e.target.value})}
                  placeholder="آیدی اینستاگرام"
                />
                <input 
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl p-5 text-sm text-zinc-100 font-bold focus:border-zinc-500 outline-none placeholder:text-zinc-500"
                  value={tempInfo.website}
                  onChange={(e) => setTempInfo({...tempInfo, website: e.target.value})}
                  placeholder="آدرس وب‌سایت اصلی"
                />
              </div>
              <input 
                className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl p-5 text-sm text-zinc-100 font-bold focus:border-zinc-500 outline-none placeholder:text-zinc-500"
                value={tempInfo.address}
                onChange={(e) => setTempInfo({...tempInfo, address: e.target.value})}
                placeholder="آدرس فیزیکی"
              />
            </div>
            <div className="flex gap-3">
              <button onClick={handleSave} className="flex-[2] bg-zinc-100 hover:bg-white text-zinc-950 py-5 rounded-3xl text-[12px] font-black uppercase tracking-tighter shadow-2xl transition-all">به‌روزرسانی هویت</button>
              <button onClick={() => setIsEditing(false)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 py-5 rounded-3xl text-[12px] font-black uppercase border border-zinc-800 transition-all">انصراف</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
