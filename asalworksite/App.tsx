
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import StoryBar from './components/StoryBar';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './pages/ProductDetail';
import StoreVideo from './components/StoreVideo';
import Dashboard from './components/Dashboard';
import LoginModal from './components/LoginModal';
import { Story, Product, SiteInfo } from './types';

const App: React.FC = () => {
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [siteInfo, setSiteInfo] = useState<SiteInfo>({
    name: "گالری یراق آلات مدرن",
    address: "تهران، خیابان سهروردی شمالی، پلاک ۱۲۳",
    phone: "07644451542",
    whatsapp: "989032691700",
    instagram: "Jazireh_lockshop",
    website: "Kishlock.com",
    description: "ارائه دهنده لوکس‌ترین دستگیره‌ها، تجهیزات کمد و اکسسوری‌های خانه.",
    videoUrl: ""
  });

  const [stories, setStories] = useState<Story[]>([
    { id: '1', imageUrl: 'https://picsum.photos/400/600?random=1', title: 'دستگیره طلایی لوکس', description: 'مناسب برای درب‌های ورودی کلاسیک', timestamp: '۲ ساعت پیش' },
    { id: '2', imageUrl: 'https://picsum.photos/400/600?random=2', title: 'مکانیزم کمد دیواری', description: 'بهینه‌سازی فضای داخلی کمد', timestamp: '۵ ساعت پیش' },
    { id: '3', imageUrl: 'https://picsum.photos/400/600?random=3', title: 'پروژه سعادت آباد', description: 'اجرای کامل دستگیره‌های هوشمند', timestamp: 'دیروز' },
  ]);

  const [products, setProducts] = useState<Product[]>([
    { id: 'p1', name: 'دستگیره مدل ارکیده', description: 'طراحی مینیمال با آلیاژ برنج', imageUrl: 'https://picsum.photos/500/500?random=11', category: 'handle', files: [] },
    { id: 'p2', name: 'لولا آرام‌بند', description: 'تکنولوژی آلمان با گارانتی مادام‌العمر', imageUrl: 'https://picsum.photos/500/500?random=12', category: 'cabinet', files: [] },
    { id: 'p3', name: 'دستگیره کمد رز', description: 'رنگ رزگلد مات، ضد خش', imageUrl: 'https://picsum.photos/500/500?random=13', category: 'handle', files: [] },
    { id: 'p4', name: 'اکسسوری جاشلواری', description: 'ریلی تلسکوپی برای کمد دیواری', imageUrl: 'https://picsum.photos/500/500?random=14', category: 'home-accessory', files: [] },
    { id: 'p5', name: 'دستگیره سرامیکی', description: 'تلفیق هنر و صنعت برای کابینت', imageUrl: 'https://picsum.photos/500/500?random=15', category: 'handle', files: [] },
    { id: 'p6', name: 'جک پمپی کابینت', description: 'قدرت ۸۰ نیوتن، عملکرد نرم', imageUrl: 'https://picsum.photos/500/500?random=16', category: 'cabinet', files: [] },
    { id: 'p7', name: 'قفل هوشمند اثرانگشتی', description: 'امنیت بالا با قابلیت اتصال به موبایل', imageUrl: 'https://picsum.photos/500/500?random=17', category: 'home-accessory', files: [] },
    { id: 'p8', name: 'سبد سوپرمارکت', description: 'طبقات قابل تنظیم برای کابینت ایستاده', imageUrl: 'https://picsum.photos/500/500?random=18', category: 'cabinet', files: [] },
    { id: 'p9', name: 'هود مخفی هوشمند', description: 'کم‌صدا با مکش فوق‌العاده', imageUrl: 'https://picsum.photos/500/500?random=19', category: 'home-accessory', files: [] },
  ]);

  const updateStory = (updatedStory: Story) => {
    setStories(prev => prev.map(s => s.id === updatedStory.id ? updatedStory : s));
  };

  const addStory = () => {
    const newStory: Story = {
      id: Date.now().toString(),
      imageUrl: 'https://picsum.photos/400/600?random=' + Math.random(),
      title: 'استوری جدید',
      description: 'توضیحات استوری جدید را وارد کنید',
      timestamp: 'هم‌اکنون'
    };
    setStories([newStory, ...stories]);
  };

  const deleteStory = (id: string) => {
    setStories(prev => prev.filter(s => s.id !== id));
  };

  const addProduct = () => {
    const newProduct: Product = {
      id: 'p' + Date.now(),
      name: 'محصول جدید',
      description: 'توضیحات محصول جدید را بنویسید',
      imageUrl: 'https://picsum.photos/500/500?random=' + Math.random(),
      category: 'handle',
      files: []
    };
    setProducts([newProduct, ...products]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateProductFiles = (productId: string, fileName: string) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, files: [...p.files, fileName] } : p));
  };

  const handleLoginToggle = () => {
    if (isOwner) {
      setIsOwner(false);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const onSuccessfulLogin = () => {
    setIsOwner(true);
    setIsLoginModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center pb-12">
      {/* Universal Floating Controls */}
      <div className="fixed bottom-6 left-6 z-[60] flex flex-col-reverse gap-3 animate-in fade-in slide-in-from-bottom-6 duration-700">
        <button 
          onClick={handleLoginToggle}
          className={`group flex items-center gap-3 px-6 py-4 rounded-[2rem] text-sm font-black shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-all border ${
            isOwner 
              ? 'bg-zinc-800 text-orange-400 border-orange-900/40 ring-4 ring-zinc-500/10' 
              : 'bg-zinc-900 text-zinc-100 border-zinc-800 hover:text-white hover:border-zinc-700'
          }`}
        >
          <span className={`transition-transform duration-500 ${isOwner ? 'rotate-180 opacity-100' : 'opacity-80'}`}>
            {isOwner ? '🔓' : '🔒'}
          </span>
          {isOwner ? 'خروج از پنل' : 'ورود مدیریت'}
        </button>
        
        {isOwner && (
          <button 
            onClick={() => setIsDashboardOpen(true)}
            className="flex items-center gap-3 px-6 py-4 rounded-[2rem] text-sm font-black bg-zinc-800 text-zinc-100 shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:bg-zinc-700 hover:text-orange-400 transition-all transform hover:scale-105 active:scale-95 border border-zinc-700"
          >
            <span className="opacity-100">✨</span>
            ویرایش محتوا
          </button>
        )}
      </div>

      <div className={`w-full max-w-2xl bg-zinc-900 shadow-2xl overflow-hidden min-h-screen relative border-x border-zinc-800 transition-all duration-500 ${isOwner ? 'ring-1 ring-orange-900/20 ring-inset' : ''}`}>
        <Routes>
          <Route path="/" element={
            <>
              <Header info={siteInfo} onEdit={isOwner ? setSiteInfo : undefined} />
              
              <div className="px-4 py-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-zinc-100 font-black mr-2 text-[11px] tracking-tighter uppercase">نمونه‌کارهای اخیر</h2>
                </div>
                <StoryBar stories={stories} isOwner={isOwner} onUpdate={updateStory} onAdd={addStory} />
              </div>

              <div className="px-4 py-6 border-t border-zinc-800/40">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-zinc-100 font-black mr-2 text-[11px] tracking-tighter uppercase">محصولات منتخب</h2>
                  {isOwner && (
                    <button onClick={addProduct} className="text-[10px] bg-zinc-800 text-zinc-100 border border-zinc-700 px-4 py-1.5 rounded-full hover:bg-zinc-800 hover:text-orange-400 transition-all font-black uppercase tracking-tighter">
                      + افزودن کالا
                    </button>
                  )}
                </div>
                <ProductGrid products={products} />
              </div>

              <div className="px-4 py-8 border-t border-zinc-800/40">
                 <h2 className="text-zinc-100 font-black mb-6 mr-2 text-[11px] tracking-tighter uppercase text-center">تور تصویری گالری</h2>
                 <StoreVideo 
                   videoUrl={siteInfo.videoUrl} 
                   isOwner={isOwner} 
                   onUpload={(url) => setSiteInfo({...siteInfo, videoUrl: url})} 
                 />
              </div>

              {/* Enhanced Contact Section */}
              <div className="px-4 py-12 border-t border-zinc-800/40 bg-zinc-950/30">
                 <h2 className="text-zinc-100 font-black mb-8 text-center text-[12px] uppercase tracking-tighter">پل‌های ارتباطی ما</h2>
                 <div className="grid grid-cols-2 gap-4">
                    <a 
                      href={`https://wa.me/${siteInfo.whatsapp}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-8 bg-zinc-900 border border-zinc-800 rounded-[2.5rem] hover:border-emerald-500/40 transition-all group shadow-xl"
                    >
                      <div className="w-16 h-16 bg-emerald-500/10 rounded-3xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">💬</div>
                      <span className="text-[13px] font-black text-zinc-100 tracking-tighter">واتساپ</span>
                      <span className="text-[9px] text-zinc-500 font-bold mt-2">مشاوره آنلاین</span>
                    </a>
                    <a 
                      href={`tel:${siteInfo.phone}`}
                      className="flex flex-col items-center justify-center p-8 bg-zinc-900 border border-zinc-800 rounded-[2.5rem] hover:border-orange-500/40 transition-all group shadow-xl"
                    >
                      <div className="w-16 h-16 bg-orange-500/10 rounded-3xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">📞</div>
                      <span className="text-[13px] font-black text-zinc-100 tracking-tighter">تماس مستقیم</span>
                      <span className="text-[9px] text-zinc-500 font-bold mt-2">پاسخگویی سریع</span>
                    </a>
                    <a 
                      href={`https://instagram.com/${siteInfo.instagram}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-8 bg-zinc-900 border border-zinc-800 rounded-[2.5rem] hover:border-pink-500/40 transition-all group shadow-xl"
                    >
                      <div className="w-16 h-16 bg-pink-500/10 rounded-3xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">📸</div>
                      <span className="text-[13px] font-black text-zinc-100 tracking-tighter">اینستاگرام</span>
                      <span className="text-[9px] text-zinc-500 font-bold mt-2">نمونه‌کارهای بیشتر</span>
                    </a>
                    <a 
                      href={siteInfo.website?.startsWith('http') ? siteInfo.website : `https://${siteInfo.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-8 bg-zinc-900 border border-zinc-800 rounded-[2.5rem] hover:border-blue-500/40 transition-all group shadow-xl"
                    >
                      <div className="w-16 h-16 bg-blue-500/10 rounded-3xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">🌐</div>
                      <span className="text-[13px] font-black text-zinc-100 tracking-tighter">وب‌سایت اصلی</span>
                      <span className="text-[9px] text-zinc-500 font-bold mt-2">کاتالوگ کامل</span>
                    </a>
                 </div>
              </div>

              <footer className="py-16 px-6 text-center border-t border-zinc-800/40 bg-zinc-950/20">
                <p className="text-[11px] text-zinc-100 font-black tracking-tighter uppercase mb-3">Modern Architectural Hardware</p>
                <p className="text-[10px] text-zinc-400 font-black italic">طراحی و اجرا توسط تیم یراق آلات مدرن</p>
              </footer>
            </>
          } />
          
          <Route path="/product/:id" element={
            <ProductDetail 
              products={products} 
              isOwner={isOwner} 
              onUpdate={updateProduct}
              onUpload={updateProductFiles} 
            />
          } />
        </Routes>
      </div>

      {isDashboardOpen && (
        <Dashboard 
          siteInfo={siteInfo}
          setSiteInfo={setSiteInfo}
          stories={stories}
          setStories={setStories}
          products={products}
          setProducts={setProducts}
          onClose={() => setIsDashboardOpen(false)}
          onAddStory={addStory}
          onDeleteStory={deleteStory}
          onAddProduct={addProduct}
          onDeleteProduct={deleteProduct}
        />
      )}

      {isLoginModalOpen && (
        <LoginModal 
          onLogin={onSuccessfulLogin}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
