
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { GoogleGenAI } from "@google/genai";

interface ProductDetailProps {
  products: Product[];
  isOwner: boolean;
  onUpdate: (product: Product) => void;
  onUpload: (productId: string, fileName: string) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ products, isOwner, onUpdate, onUpload }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Product | null>(product || null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [activeView, setActiveView] = useState<'info' | 'files'>(isOwner ? 'files' : 'info');

  useEffect(() => {
    if (product) {
      setEditData(product);
    }
  }, [product, id]);

  if (!product || !editData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-zinc-100 p-10">
        <span className="text-6xl mb-6 opacity-80">🔍</span>
        <p className="font-black text-[13px] tracking-tighter uppercase">محصول پیدا نشد</p>
        <button onClick={() => navigate('/')} className="mt-6 text-zinc-100 hover:text-orange-400 transition-colors text-[12px] font-black uppercase tracking-tighter">بازگشت به گالری</button>
      </div>
    );
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setTimeout(() => {
        onUpload(product.id, file.name);
        setIsUploading(false);
      }, 1500);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setEditData({...editData, imageUrl: url});
    }
  };

  const saveChanges = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const improveDescriptionWithAi = async () => {
    if (!editData.description) return;
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Rewrite this product description for a luxury hardware and handle store in Persian. Make it more professional, elegant, and attractive for customers. Focus on quality and design. Original text: "${editData.description}"`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      if (response.text) {
        setEditData({ ...editData, description: response.text.trim() });
      }
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="bg-zinc-950 min-h-screen pb-24 relative animate-in fade-in duration-1000">
      {/* Back Button */}
      <button 
        onClick={() => navigate('/')}
        className="fixed top-8 left-8 z-[70] bg-zinc-900/60 hover:bg-zinc-800 transition-all w-14 h-14 rounded-3xl text-zinc-100 hover:text-white backdrop-blur-3xl border border-zinc-800 flex items-center justify-center shadow-2xl group"
      >
        <span className="text-2xl group-hover:-translate-x-1 transition-transform">←</span>
      </button>

      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden bg-zinc-900">
        <img 
          src={editData.imageUrl} 
          alt={editData.name} 
          className="w-full h-full object-cover transition-opacity duration-700 opacity-80" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
        
        {isEditing && (
          <label className="absolute inset-0 flex items-center justify-center z-40 bg-zinc-950/60 backdrop-blur-sm cursor-pointer transition-all hover:bg-zinc-950/40 group">
            <div className="bg-zinc-100 text-zinc-950 px-12 py-6 rounded-[3rem] text-[13px] font-black shadow-2xl flex flex-col items-center gap-4 transform group-hover:scale-105 transition-transform tracking-tighter">
               <span className="text-4xl opacity-100">📸</span>
               بارگذاری تصویر جدید
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>
        )}
      </div>

      {/* Main Content Area */}
      <div className="max-w-2xl mx-auto px-8 -mt-40 relative z-10">
        
        {/* Tab Switcher */}
        <div className="flex bg-zinc-900/95 backdrop-blur-3xl rounded-[3rem] p-2 mb-10 border border-zinc-800 shadow-2xl">
          <button 
            onClick={() => setActiveView('info')}
            className={`flex-1 py-5 rounded-[2.5rem] text-[12px] font-black uppercase tracking-tighter transition-all flex items-center justify-center gap-3 ${activeView === 'info' ? 'bg-zinc-800 text-orange-400 shadow-xl border border-zinc-700' : 'text-zinc-100 hover:text-orange-400'}`}
          >
            <span>📄</span>
            مشخصات فنی
          </button>
          <button 
            onClick={() => setActiveView('files')}
            className={`flex-1 py-5 rounded-[2.5rem] text-[12px] font-black uppercase tracking-tighter transition-all flex items-center justify-center gap-3 ${activeView === 'files' ? 'bg-zinc-800 text-orange-400 shadow-xl border border-zinc-700' : 'text-zinc-100 hover:text-orange-400'}`}
          >
            <span>📁</span>
            فایل‌ها ({product.files.length})
          </button>
        </div>

        {activeView === 'info' ? (
          <div className="bg-zinc-900/70 border border-zinc-800 p-12 rounded-[4rem] shadow-2xl space-y-10 animate-in slide-in-from-bottom-12 duration-700">
            {!isEditing ? (
              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-2 h-6 bg-orange-400 rounded-full"></span>
                      <span className="text-[11px] font-black text-zinc-100 uppercase tracking-tighter">
                         {product.category === 'handle' ? 'مجموعه دستگیره‌های لوکس' : product.category === 'cabinet' ? 'سیستم‌های کمد و کابینت' : 'اکسسوری منزل'}
                      </span>
                    </div>
                    <h1 className="text-5xl font-black text-zinc-100 tracking-tighter leading-tight">{product.name}</h1>
                  </div>
                  {isOwner && (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 hover:text-orange-400 p-5 rounded-3xl transition-all border border-zinc-700 shadow-2xl"
                    >
                      🛠️
                    </button>
                  )}
                </div>
                <p className="text-zinc-100 text-[17px] leading-[2.2] text-justify font-black">{product.description}</p>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-zinc-100 font-black text-[11px] tracking-tighter uppercase flex items-center gap-3">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    حالت ویرایش سریع
                  </h2>
                  <div className="flex gap-3">
                    <button onClick={saveChanges} className="bg-zinc-100 text-zinc-950 px-8 py-4 rounded-2xl text-[12px] font-black uppercase shadow-2xl hover:bg-white tracking-tighter transition-all">ذخیره</button>
                    <button onClick={() => setIsEditing(false)} className="bg-zinc-800 text-zinc-100 px-6 py-4 rounded-2xl text-[12px] font-black hover:bg-zinc-700 tracking-tighter transition-all">انصراف</button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[11px] text-zinc-100 font-black uppercase tracking-tighter">نام مدل</label>
                  <input 
                    className="w-full bg-zinc-800/60 border border-zinc-700 rounded-2xl p-6 text-sm text-zinc-100 font-black focus:border-orange-400 outline-none transition-all tracking-tighter"
                    value={editData.name}
                    onChange={(e) => setEditData({...editData, name: e.target.value})}
                  />
                </div>

                <div className="space-y-3 relative">
                  <label className="text-[11px] text-zinc-100 font-black uppercase tracking-tighter">توضیحات فنی</label>
                  <textarea 
                    className="w-full bg-zinc-800/60 border border-zinc-700 rounded-2xl p-6 text-sm text-zinc-100 font-black focus:border-orange-400 outline-none min-h-[250px] leading-relaxed transition-all tracking-tighter"
                    value={editData.description}
                    onChange={(e) => setEditData({...editData, description: e.target.value})}
                  />
                  <button 
                    onClick={improveDescriptionWithAi}
                    disabled={isAiLoading}
                    className="absolute bottom-6 left-6 flex items-center gap-3 px-6 py-3 bg-zinc-950/80 hover:bg-zinc-900 rounded-2xl text-[11px] text-orange-400 font-black uppercase tracking-tighter border border-zinc-800 transition-all shadow-2xl"
                  >
                    {isAiLoading ? 'در حال پردازش...' : '✨ بهبود با هوش مصنوعی'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-zinc-900/70 border border-zinc-800 p-12 rounded-[4rem] shadow-2xl space-y-12 animate-in slide-in-from-bottom-12 duration-700">
            <div className="space-y-4">
              <h3 className="text-3xl font-black text-zinc-100 tracking-tighter flex items-center gap-5">
                <span className="w-2 h-10 bg-zinc-700 rounded-full border border-zinc-600"></span>
                مستندات و فایل‌های محصول
              </h3>
              <p className="text-[12px] text-zinc-100 font-black uppercase tracking-tighter leading-relaxed">مشخصات فنی و راهنماهای نصب</p>
            </div>
            
            <div className="space-y-4 max-h-[40vh] overflow-y-auto custom-scrollbar pl-4">
              {product.files.length > 0 ? (
                product.files.map((f, i) => (
                  <div key={i} className="flex justify-between items-center bg-zinc-800/40 p-7 rounded-[2.5rem] border border-zinc-800/50 hover:border-orange-400/30 transition-all group hover:bg-zinc-800/60">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center text-2xl border border-zinc-800 group-hover:scale-110 transition-transform">📄</div>
                      <div>
                        <p className="text-base font-black text-zinc-100 tracking-tighter">{f}</p>
                        <p className="text-[10px] text-zinc-400 mt-1 font-black uppercase tracking-tighter">فایل تخصصی</p>
                      </div>
                    </div>
                    <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 hover:text-orange-400 px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-tighter border border-zinc-700 transition-all shadow-xl">
                      دانلود
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-24 bg-zinc-950/40 rounded-[3.5rem] border-2 border-dashed border-zinc-800/50">
                  <span className="text-6xl block mb-8 opacity-20">📂</span>
                  <p className="text-[12px] text-zinc-100 font-black uppercase tracking-tighter">فایل فنی یافت نشد</p>
                </div>
              )}
            </div>

            {isOwner && (
              <div className="bg-zinc-950/40 border-2 border-dashed border-zinc-800 p-14 rounded-[4rem] text-center space-y-8 group transition-all hover:bg-zinc-950/60 hover:border-orange-400/30">
                <div className="w-24 h-24 bg-zinc-900 rounded-[2.5rem] flex items-center justify-center text-4xl mx-auto shadow-2xl border border-zinc-800 group-hover:-translate-y-2 transition-transform">📤</div>
                <div className="space-y-2">
                  <h4 className="text-xl font-black text-zinc-100 tracking-tighter">آپلود مستندات فنی</h4>
                  <p className="text-[11px] text-zinc-400 font-black uppercase tracking-tighter">CAD • PDF • STEP • DWG</p>
                </div>
                <label className="inline-flex items-center gap-4 bg-zinc-100 hover:bg-white text-zinc-950 px-14 py-6 rounded-[3rem] text-[13px] font-black cursor-pointer transition-all shadow-2xl transform active:scale-95 border-b-4 border-zinc-300 tracking-tighter">
                  {isUploading ? 'درحال پردازش...' : 'آپلود فایل جدید'}
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileUpload}
                    disabled={isUploading}
                  />
                </label>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
