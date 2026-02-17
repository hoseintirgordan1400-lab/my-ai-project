
import React, { useState } from 'react';
import { Story } from '../types';
import StoryModal from './StoryModal';

interface StoryBarProps {
  stories: Story[];
  isOwner: boolean;
  onUpdate: (story: Story) => void;
  onAdd: () => void;
}

const StoryBar: React.FC<StoryBarProps> = ({ stories, isOwner, onUpdate, onAdd }) => {
  const [activeStory, setActiveStory] = useState<Story | null>(null);

  return (
    <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4 items-start px-2">
      {isOwner && (
        <div 
          onClick={onAdd}
          className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer group"
        >
          <div className="w-20 h-20 rounded-full flex items-center justify-center border-2 border-dashed border-zinc-800 group-hover:border-zinc-600 group-hover:bg-zinc-800/40 transition-all">
            <span className="text-4xl text-zinc-100 group-hover:text-orange-400 font-light">+</span>
          </div>
          <span className="text-[10px] text-zinc-100 font-black uppercase tracking-tighter">افزودن</span>
        </div>
      )}

      {stories.map((story) => (
        <div 
          key={story.id} 
          onClick={() => setActiveStory(story)}
          className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer group"
        >
          <div className="w-20 h-20 rounded-full p-0.5 border border-zinc-800 group-hover:border-orange-400/50 transition-all overflow-hidden shadow-2xl">
            <img 
              src={story.imageUrl} 
              alt={story.title} 
              className="w-full h-full rounded-full object-cover transition-all duration-700 border-2 border-zinc-900"
            />
          </div>
          <span className="text-[10px] text-zinc-100 font-black uppercase tracking-tighter truncate w-20 text-center group-hover:text-orange-400 transition-colors">{story.title}</span>
        </div>
      ))}

      {activeStory && (
        <StoryModal 
          story={activeStory} 
          isOwner={isOwner} 
          onClose={() => setActiveStory(null)} 
          onUpdate={(updated) => {
            onUpdate(updated);
            setActiveStory(updated);
          }}
        />
      )}
    </div>
  );
};

export default StoryBar;
