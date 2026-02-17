
import React, { useState } from 'react';
import { SiteInfo, Story, Product } from '../types';

interface DashboardProps {
  siteInfo: SiteInfo;
  setSiteInfo: (info: SiteInfo) => void;
  stories: Story[];
  setStories: React.Dispatch<React.SetStateAction<Story[]>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  onClose: () => void;
  onAddStory: () => void;
  onDeleteStory: (id: string) => void;
  onAddProduct: () => void;
  onDeleteProduct: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  siteInfo, setSiteInfo, stories, setStories, products, setProducts, 
  onClose, onAddStory, onDeleteStory, onAddProduct, onDeleteProduct 
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'stories' | 'products' | 'media'>('general');
  const [selectedProductIdForFiles, setSelectedProductIdForFiles] = useState<string | null>(null);

  const updateStoryItem = (id: string, field: keyof Story, value: string) => {
    setStories(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleStoryImageChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateStoryItem(id, 'imageUrl', url);
    }
  };

  const updateProductItem = (id: string, field: keyof Product, value: any) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleProductImageChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateProductItem(id, 'imageUrl', url);
    }
  };

  const handleProductFileUpload = (productId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const product = products.find(p => p.id === productId);
      if (product) {
        const updatedFiles = [...product.files, file.name];
        updateProductItem(productId, 'files', updatedFiles);
      }
    }
  };

  const removeProductFile = (productId: string, fileName: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      const updatedFiles = product.files.filter(f => f !== fileName);
      updateProductItem(productId, 'files', updatedFiles);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 animate-in fade-in duration-300">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-5xl h-[85vh] rounded-[3rem] overflow-hidden flex flex-col shadow-2xl">
        
        {/* Top Navbar */}
        <div className="px-10 py-8 border-b border-zinc-800 flex justify-between items-center bg-zinc-950/20">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center text-2xl border border-zinc-700 shadow-xl">
              ⚙️
            </div>
            <div>
              <h2 className="text-xl font-black text-zinc-100 tracking-tighter">مدیریت محتوای تخصصی</h2>
              <p className="text-[11px] text-zinc-300 font-black uppercase tracking-tighter mt-1">پنل کنترل نسخه ۲.۵</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-12 h-12 flex items-center justify-center hover:bg-zinc-800 rounded-2xl text-zinc-100 transition-all hover:text-orange-400 border border-transparent hover:border-zinc-700"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Tabs */}
          <div className="w-72 bg-zinc-950/10 border-l border-zinc-800 py-8 px-6 space-y-3">
            {[
              { id: 'general', label: 'اطلاعات پایه', icon: '🏠' },
              { id: 'stories', label: 'نمونه‌کارها', icon: '📸' },
              { id: 'products', label: 'لیست محصولات', icon: '📦' },
              { id: 'media', label: 'ویدیو و رسانه', icon: '🎬' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-black transition-all relative group ${
                  activeTab === tab.id 
                    ? 'bg-zinc-800 text-orange-400 shadow-xl border border-zinc-700' 
                    : 'text-zinc-100 hover:text-orange-400 hover:bg-zinc-800/40'
                }`}
              >
                {activeTab === tab.id && <div className="absolute right-2 w-1 h-6 bg-orange-400 rounded-full"></div>}
                <span className={`text-xl transition-opacity ${activeTab === tab.id ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main Content Pane */}
          <div className="flex-1 overflow-y-auto p-10 bg-zinc-900/50 custom-scrollbar">
            
            {activeTab === 'general' && (
              <div className="space-y-10 animate-in slide-in-from-left-4 duration-300">
                <section className="space-y-6">
                  <h3 className="text-zinc-100 font-black text-[12px] uppercase tracking-tighter flex items-center gap-3">
                    <span className="w-4 h-[2px] bg-orange-400"></span>
                    هویت بصری و تماس
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] text-zinc-100 font-black uppercase tracking-tighter">نام برند</label>
                      <input 
                        className="w-full bg-zinc-800/40 border border-zinc-800 rounded-2xl p-4 text-sm text-zinc-100 font-black focus:border-orange-400 outline-none transition-all"
                        value={siteInfo.name}
                        onChange={(e) => setSiteInfo({...siteInfo, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] text-zinc-100 font-black uppercase tracking-tighter">تلفن گویا</label>
                      <input 
                        className="w-full bg-zinc-800/40 border border-zinc-800 rounded-2xl p-4 text-sm text-zinc-100 font-black focus:border-orange-400 outline-none transition-all"
                        value={siteInfo.phone}
                        onChange={(e) => setSiteInfo({...siteInfo, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] text-zinc-100 font-black uppercase tracking-tighter">شماره واتساپ (بدون +)</label>
                      <input 
                        className="w-full bg-zinc-800/40 border border-zinc-800 rounded-2xl p-4 text-sm text-zinc-100 font-black focus:border-emerald-400 outline-none transition-all placeholder:text-zinc-700"
                        value={siteInfo.whatsapp}
                        onChange={(e) => setSiteInfo({...siteInfo, whatsapp: e.target.value})}
                        placeholder="مثلاً: 989123456789"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] text-zinc-100 font-black uppercase tracking-tighter">آدرس پستی</label>
                      <input 
                        className="w-full bg-zinc-800/40 border border-zinc-800 rounded-2xl p-4 text-sm text-zinc-100 font-black focus:border-orange-400 outline-none transition-all"
                        value={siteInfo.address}
                        onChange={(e) => setSiteInfo({...siteInfo, address: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] text-zinc-100 font-black uppercase tracking-tighter">آیدی اینستاگرام</label>
                      <input 
                        className="w-full bg-zinc-800/40 border border-zinc-800 rounded-2xl p-4 text-sm text-zinc-100 font-black focus:border-pink-400 outline-none transition-all placeholder:text-zinc-700"
                        value={siteInfo.instagram}
                        onChange={(e) => setSiteInfo({...siteInfo, instagram: e.target.value})}
                        placeholder="مثلاً: modern.hardware"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] text-zinc-100 font-black uppercase tracking-tighter">وب‌سایت اصلی</label>
                      <input 
                        className="w-full bg-zinc-800/40 border border-zinc-800 rounded-2xl p-4 text-sm text-zinc-100 font-black focus:border-blue-400 outline-none transition-all placeholder:text-zinc-700"
                        value={siteInfo.website}
                        onChange={(e) => setSiteInfo({...siteInfo, website: e.target.value})}
                        placeholder="www.example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] text-zinc-100 font-black uppercase tracking-tighter">بیانیه برند</label>
                    <textarea 
                      className="w-full bg-zinc-800/40 border border-zinc-800 rounded-2xl p-4 text-sm text-zinc-100 font-black focus:border-orange-400 outline-none min-h-[150px] leading-relaxed"
                      value={siteInfo.description}
                      onChange={(e) => setSiteInfo({...siteInfo, description: e.target.value})}
                    />
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'stories' && (
              <div className="space-y-8 animate-in slide-in-from-left-4 duration-300">
                <div className="flex justify-between items-center border-b border-zinc-800 pb-6">
                  <p className="text-[11px] text-zinc-100 font-black uppercase tracking-tighter">فهرست استوری‌های فعال</p>
                  <button 
                    onClick={onAddStory}
                    className="bg-zinc-100 hover:bg-white text-zinc-950 px-6 py-3 rounded-2xl text-[12px] font-black tracking-tighter transition-all shadow-xl"
                  >
                    + استوری جدید
                  </button>
                </div>
                <div className="grid gap-4">
                  {stories.map(s => (
                    <div key={s.id} className="bg-zinc-800/30 border border-zinc-800 p-6 rounded-[2.5rem] flex items-center gap-6 group hover:border-zinc-700 transition-all">
                      <div className="relative w-20 h-20 flex-shrink-0 group/img">
                        <img src={s.imageUrl} className="w-full h-full rounded-full object-cover ring-4 ring-zinc-900 group-hover:ring-orange-400 transition-all" />
                        <label className="absolute inset-0 bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover/img:opacity-100 cursor-pointer text-[10px] text-zinc-100 font-black tracking-tighter transition-all">
                          تعویض
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleStoryImageChange(s.id, e)} />
                        </label>
                      </div>
                      <div className="flex-1 grid grid-cols-1 gap-2">
                        <input 
                          className="bg-transparent text-lg font-black text-zinc-100 outline-none focus:text-orange-400 tracking-tighter transition-all"
                          value={s.title}
                          onChange={(e) => updateStoryItem(s.id, 'title', e.target.value)}
                        />
                        <input 
                          className="bg-transparent text-sm text-zinc-100 font-bold outline-none focus:text-zinc-400 tracking-tighter"
                          value={s.description}
                          onChange={(e) => updateStoryItem(s.id, 'description', e.target.value)}
                        />
                      </div>
                      <button 
                        onClick={() => onDeleteStory(s.id)}
                        className="w-12 h-12 flex items-center justify-center text-zinc-500 hover:text-red-400 hover:bg-red-500/5 rounded-2xl transition-all border border-transparent hover:border-red-500/10"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="space-y-8 animate-in slide-in-from-left-4 duration-300">
                <div className="flex justify-between items-center border-b border-zinc-800 pb-6">
                  <p className="text-[11px] text-zinc-100 font-black uppercase tracking-tighter">مدیریت کالاهای نمایشگاه</p>
                  <button 
                    onClick={onAddProduct}
                    className="bg-zinc-800 hover:bg-zinc-700 text-orange-400 px-6 py-3 rounded-2xl text-[12px] font-black tracking-tighter border border-zinc-700 transition-all shadow-xl"
                  >
                    + افزودن کالای جدید
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {products.map(p => (
                    <div key={p.id} className="bg-zinc-800/20 border border-zinc-800 p-6 rounded-[2.5rem] flex flex-col gap-6 hover:border-zinc-700 transition-all group">
                      <div className="flex items-center gap-6">
                        <div className="relative w-24 h-24 flex-shrink-0 group/pimg">
                          <img src={p.imageUrl} className="w-full h-full rounded-3xl object-cover border border-zinc-800 group-hover:border-zinc-700 transition-all" />
                          <label className="absolute inset-0 bg-black/70 rounded-3xl flex items-center justify-center opacity-0 group-hover/pimg:opacity-100 cursor-pointer text-[10px] text-white font-black tracking-tighter transition-all">
                            تغییر عکس
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleProductImageChange(p.id, e)} />
                          </label>
                        </div>
                        <div className="flex-1">
                          <input 
                            className="w-full bg-transparent text-xl font-black text-zinc-100 outline-none focus:text-orange-400 mb-2 tracking-tighter"
                            value={p.name}
                            onChange={(e) => updateProductItem(p.id, 'name', e.target.value)}
                          />
                          <div className="flex gap-3 items-center">
                            <select 
                              className="bg-zinc-900 text-[11px] text-zinc-100 font-black px-4 py-2 rounded-xl border border-zinc-800 outline-none focus:border-zinc-500 transition-all tracking-tighter"
                              value={p.category}
                              onChange={(e) => updateProductItem(p.id, 'category', e.target.value)}
                            >
                              <option value="handle">دستگیره لوکس</option>
                              <option value="cabinet">تجهیزات کمد</option>
                              <option value="home-accessory">اکسسوری</option>
                            </select>
                            <button 
                              onClick={() => setSelectedProductIdForFiles(selectedProductIdForFiles === p.id ? null : p.id)}
                              className={`text-[11px] font-black px-4 py-2 rounded-xl transition-all border tracking-tighter ${selectedProductIdForFiles === p.id ? 'bg-orange-950/40 text-orange-400 border-orange-900/40' : 'bg-zinc-900 text-zinc-100 border-zinc-800 hover:text-orange-400'}`}
                            >
                              📂 {p.files.length} فایل فنی
                            </button>
                          </div>
                        </div>
                        <button 
                          onClick={() => onDeleteProduct(p.id)}
                          className="text-zinc-500 hover:text-red-400 p-3 transition-all hover:bg-red-500/5 rounded-2xl"
                        >
                          🗑️
                        </button>
                      </div>

                      {selectedProductIdForFiles === p.id && (
                        <div className="bg-zinc-950/40 border border-zinc-800 rounded-3xl p-6 mt-2 space-y-6 animate-in slide-in-from-top-4 duration-300">
                          <div className="flex justify-between items-center">
                            <span className="text-[11px] text-zinc-100 font-black uppercase tracking-tighter">آرشیو مستندات فنی</span>
                            <label className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-4 py-2 rounded-xl text-[11px] font-black tracking-tighter border border-zinc-700 cursor-pointer transition-all">
                              + بارگذاری فایل فنی
                              <input type="file" className="hidden" onChange={(e) => handleProductFileUpload(p.id, e)} />
                            </label>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {p.files.map((file, idx) => (
                              <div key={idx} className="flex justify-between items-center bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800/50 group/file">
                                <span className="text-[12px] text-zinc-100 font-black truncate flex items-center gap-3">
                                  <span className="opacity-100 text-lg">📎</span>
                                  {file}
                                </span>
                                <button 
                                  onClick={() => removeProductFile(p.id, file)}
                                  className="text-[10px] text-zinc-100 hover:text-red-400 font-black px-2 transition-colors"
                                >
                                  حذف
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'media' && (
              <div className="animate-in slide-in-from-left-4 duration-300 max-w-xl">
                <section className="space-y-6">
                  <h3 className="text-zinc-100 font-black text-[12px] uppercase tracking-tighter">رسانه تصویری مجموعه</h3>
                  <div className="bg-zinc-950/20 border-2 border-dashed border-zinc-800 rounded-[3rem] p-12 text-center space-y-6 group hover:border-zinc-700 transition-all">
                    <div className="w-20 h-20 bg-zinc-900 rounded-[2rem] flex items-center justify-center text-3xl mx-auto border border-zinc-800 shadow-2xl group-hover:rotate-6 transition-transform">📽️</div>
                    <div className="space-y-2">
                      <p className="text-base font-black text-zinc-100">ویدیوی معرفی گالری</p>
                      <p className="text-[11px] text-zinc-400 font-bold leading-relaxed max-w-xs mx-auto">فایل‌های MP4 با رزولوشن ۱۰۸۰p و حجم زیر ۳۰ مگابایت پیشنهاد می‌شوند.</p>
                    </div>
                    <label className="inline-block bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-10 py-4 rounded-2xl text-[11px] font-black tracking-tighter cursor-pointer transition-all border border-zinc-700 shadow-xl">
                      انتخاب و جایگزینی ویدیو
                      <input type="file" accept="video/*" className="hidden" />
                    </label>
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-10 bg-zinc-950/40 border-t border-zinc-800 flex justify-center">
          <button 
            onClick={onClose}
            className="w-full max-w-sm bg-zinc-100 hover:bg-white text-zinc-950 py-5 rounded-[2rem] text-[13px] font-black tracking-tighter shadow-2xl transition-all transform active:scale-95 flex items-center justify-center gap-4"
          >
            تایید نهایی و خروج از پنل
            <span className="text-xl">✔️</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
