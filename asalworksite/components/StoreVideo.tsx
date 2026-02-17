
import React from 'react';

interface StoreVideoProps {
  videoUrl?: string;
  isOwner: boolean;
  onUpload: (url: string) => void;
}

const StoreVideo: React.FC<StoreVideoProps> = ({ videoUrl, isOwner, onUpload }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onUpload(url);
    }
  };

  return (
    <div className="w-full rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700 aspect-video relative group">
      {videoUrl ? (
        <video 
          src={videoUrl} 
          controls 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600 gap-2">
           <span className="text-4xl">🎬</span>
           <p className="text-sm">هنوز ویدیویی بارگذاری نشده است</p>
        </div>
      )}

      {isOwner && (
        <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          <span className="bg-orange-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl">
            {videoUrl ? 'تعویض ویدیو' : 'بارگذاری ویدیو فروشگاه'}
          </span>
          <input type="file" accept="video/*" className="hidden" onChange={handleFileChange} />
        </label>
      )}
    </div>
  );
};

export default StoreVideo;
