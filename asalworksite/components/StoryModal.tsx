
import React, { useState } from 'react';
import { Story } from '../types';

interface StoryModalProps {
  story: Story;
  isOwner: boolean;
  onClose: () => void;
  onUpdate: (story: Story) => void;
}

const StoryModal: React.FC<StoryModalProps> = ({ story, isOwner, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(story);

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setEditData({...editData, imageUrl: url});
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/98 animate-in fade-in duration-500 backdrop-blur-3xl">
      <button 
        onClick={onClose}
        className="absolute top-10 right-10 text-zinc-100 text-4xl z-20 p-4 hover:text-orange-400 transition-all flex items-center justify-center w-12 h-12 rounded-full hover:bg-zinc-800/40"
      >
        ✕
      </button>

      <div className="relative w-full max-w-lg aspect-[9/16] bg-zinc-950 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] flex flex-col group border border-zinc-900">
        {/* Background Image */}
        <img 
          src={editData.imageUrl} 
          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${isEditing ? 'opacity-20 scale-105' : 'opacity-100'}`} 
          alt="story" 
        />
        
        {/* Change Image Button - visible only in Edit Mode */}
        {isEditing && (
          <label className="absolute inset-0 flex items-center justify-center bg-black/60 cursor-pointer z-10 transition-all hover:bg-black/40">
            <div className="bg-zinc-100 px-10 py-5 rounded-3xl text-[12px] font-black uppercase tracking-tighter text-zinc-950 shadow-2xl border border-white/10 flex flex-col items-center gap-4 transform transition-transform hover:scale-105">
              <span className="text-3xl">📸</span>
              تعویض تصویر
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>
        )}
        
        {/* Content Overlay */}
        <div className="relative mt-auto p-10 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-transparent pt-40">
          {!isEditing ? (
            <div className="space-y-6">
              <h3 className="text-3xl font-black text-zinc-100 leading-tight tracking-tighter">{editData.title}</h3>
              <p className="text-lg text-zinc-100 leading-relaxed font-black">{editData.description}</p>
              <div className="flex justify-between items-center pt-8">
                <span className="text-[11px] text-zinc-100 font-black uppercase tracking-tighter bg-zinc-900/80 px-4 py-2 rounded-xl border border-zinc-800">{editData.timestamp}</span>
                {isOwner && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="bg-zinc-800 hover:bg-zinc-700 px-8 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-tighter text-zinc-100 shadow-2xl transition-all border border-zinc-700"
                  >
                    ویرایش محتوا
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-zinc-900/95 p-8 rounded-[2.5rem] space-y-6 border border-zinc-700/50 backdrop-blur-2xl shadow-2xl animate-in slide-in-from-bottom-8 duration-500">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-zinc-100 uppercase tracking-tighter">حالت ویرایش</span>
              </div>
              <div className="space-y-4">
                <input 
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-2xl p-4 text-sm text-zinc-100 font-black focus:border-zinc-500 outline-none transition-all placeholder:text-zinc-700"
                  value={editData.title}
                  onChange={(e) => setEditData({...editData, title: e.target.value})}
                  placeholder="عنوان استوری"
                />
                <textarea 
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-2xl p-4 text-sm text-zinc-100 font-black focus:border-zinc-500 outline-none transition-all min-h-[120px] placeholder:text-zinc-700"
                  value={editData.description}
                  onChange={(e) => setEditData({...editData, description: e.target.value})}
                  placeholder="متن توضیحات"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={handleSave} 
                  className="flex-[2] bg-zinc-100 hover:bg-white py-4 rounded-2xl text-[12px] font-black uppercase tracking-tighter text-zinc-950 shadow-2xl transition-all transform active:scale-95 border-b-4 border-zinc-300"
                >
                  تایید و ذخیره
                </button>
                <button 
                  onClick={() => setIsEditing(false)} 
                  className="flex-1 bg-zinc-950 hover:bg-zinc-900 py-4 rounded-2xl text-[12px] font-black uppercase tracking-tighter border border-zinc-800 text-zinc-100 transition-all"
                >
                  انصراف
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryModal;
