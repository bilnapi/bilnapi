import React, { useState, useEffect, useRef } from 'react';
import { Heart, Calendar, Image as ImageIcon, MessageCircle, Target, Sparkles, Music, Settings, BookOpen } from 'lucide-react';
import { CoupleProfile, MemoryMilestone, PhotoAlbum, PhotoItem, LoveNote, BucketItem } from './types';
import { initialProfile, initialMilestones, initialAlbums, initialPhotos, initialNotes, initialBucketList } from './data/initialData';
import { Header } from './components/Header';
import { DaysCounter } from './components/DaysCounter';
import { TimelineSection } from './components/TimelineSection';
import { GallerySection } from './components/GallerySection';
import { LoveDiarySection } from './components/LoveDiarySection';
import { BucketListSection } from './components/BucketListSection';
import { SettingsModal } from './components/SettingsModal';
import { GuideModal } from './components/GuideModal';

export function App() {
  // Load initial states from localStorage if present
  const [profile, setProfile] = useState<CoupleProfile>(() => {
    const saved = localStorage.getItem('couple_profile');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.husbandName === 'Minh Tuấn' || parsed.husbandName === 'Chồng') {
        return initialProfile;
      }
      return parsed;
    }
    return initialProfile;
  });

  const [milestones, setMilestones] = useState<MemoryMilestone[]>(() => {
    const saved = localStorage.getItem('couple_milestones');
    if (saved) {
      const parsed: MemoryMilestone[] = JSON.parse(saved);
      return parsed.filter((item) => !['m1', 'm2', 'm3', 'm4', 'm5'].includes(item.id));
    }
    return initialMilestones;
  });

  const [albums, setAlbums] = useState<PhotoAlbum[]>(() => {
    const saved = localStorage.getItem('couple_albums');
    if (saved) {
      const parsed: PhotoAlbum[] = JSON.parse(saved);
      return parsed.filter((item) => !['a1', 'a2', 'a3'].includes(item.id));
    }
    return initialAlbums;
  });

  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    const saved = localStorage.getItem('couple_photos');
    if (saved) {
      const parsed: PhotoItem[] = JSON.parse(saved);
      return parsed.filter((item) => !['p1', 'p2', 'p3', 'p4', 'p5'].includes(item.id));
    }
    return initialPhotos;
  });

  const [notes, setNotes] = useState<LoveNote[]>(() => {
    const saved = localStorage.getItem('couple_notes');
    if (saved) {
      const parsed: LoveNote[] = JSON.parse(saved);
      return parsed.filter((item) => !['n1', 'n2'].includes(item.id));
    }
    return initialNotes;
  });

  const [bucketList, setBucketList] = useState<BucketItem[]>(() => {
    const saved = localStorage.getItem('couple_bucket_list');
    if (saved) {
      const parsed: BucketItem[] = JSON.parse(saved);
      return parsed.filter((item) => !['b1', 'b2', 'b3', 'b4'].includes(item.id));
    }
    return initialBucketList;
  });

  // Navigation State
  const [activeTab, setActiveTab] = useState<'timeline' | 'gallery' | 'notes' | 'bucket'>('timeline');

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Background Audio
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('couple_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('couple_milestones', JSON.stringify(milestones));
  }, [milestones]);

  useEffect(() => {
    localStorage.setItem('couple_albums', JSON.stringify(albums));
  }, [albums]);

  useEffect(() => {
    localStorage.setItem('couple_photos', JSON.stringify(photos));
  }, [photos]);

  useEffect(() => {
    localStorage.setItem('couple_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('couple_bucket_list', JSON.stringify(bucketList));
  }, [bucketList]);

  // Handle Music Toggle
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsMusicPlaying(true);
      }).catch((err) => {
        console.warn('Audio play failed:', err);
      });
    }
  };

  // Handlers for Milestones
  const handleAddMilestone = (newItem: MemoryMilestone) => {
    setMilestones((prev) => [newItem, ...prev]);
  };

  const handleDeleteMilestone = (id: string) => {
    setMilestones((prev) => prev.filter((m) => m.id !== id));
  };

  const handleLikeMilestone = (id: string) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, likesCount: m.likesCount + 1 } : m))
    );
  };

  // Handlers for Gallery
  const handleAddPhoto = (newPhoto: PhotoItem) => {
    setPhotos((prev) => [newPhoto, ...prev]);
  };

  const handleDeletePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddAlbum = (newAlbum: PhotoAlbum) => {
    setAlbums((prev) => [...prev, newAlbum]);
  };

  // Handlers for Notes
  const handleAddNote = (newNote: LoveNote) => {
    setNotes((prev) => [newNote, ...prev]);
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  // Handlers for Bucket List
  const handleAddBucketItem = (newItem: BucketItem) => {
    setBucketList((prev) => [...prev, newItem]);
  };

  const handleToggleBucketItem = (id: string) => {
    setBucketList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const handleDeleteBucketItem = (id: string) => {
    setBucketList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-rose-50/30 text-slate-800 pb-20">
      {/* Background Audio Element */}
      {profile.backgroundMusicUrl && (
        <audio
          ref={audioRef}
          src={profile.backgroundMusicUrl}
          loop
          preload="none"
        />
      )}

      {/* Main Couple Hero Header */}
      <Header
        profile={profile}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={toggleMusic}
      />

      {/* Counter Section */}
      <div className="max-w-6xl mx-auto px-4 -mt-6 relative z-30">
        <DaysCounter
          startDate={profile.startDate}
          anniversaryType={profile.anniversaryType}
          husbandName={profile.husbandName}
          wifeName={profile.wifeName}
        />
      </div>

      {/* Main Navigation Tabs */}
      <div className="max-w-4xl mx-auto px-4 my-6">
        <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-full border border-rose-100 shadow-md flex items-center justify-between gap-1 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex-1 min-w-[110px] py-2.5 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'timeline'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                : 'text-slate-600 hover:text-rose-500 hover:bg-rose-50/50'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Dòng Thời Gian</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex-1 min-w-[110px] py-2.5 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'gallery'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                : 'text-slate-600 hover:text-rose-500 hover:bg-rose-50/50'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Album Hình Ảnh</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`flex-1 min-w-[110px] py-2.5 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'notes'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                : 'text-slate-600 hover:text-rose-500 hover:bg-rose-50/50'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Thư Tình Yêu</span>
          </button>

          <button
            onClick={() => setActiveTab('bucket')}
            className={`flex-1 min-w-[110px] py-2.5 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'bucket'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                : 'text-slate-600 hover:text-rose-500 hover:bg-rose-50/50'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Bucket List</span>
          </button>
        </div>
      </div>

      {/* Active Tab View */}
      <main className="transition-all duration-300">
        {activeTab === 'timeline' && (
          <TimelineSection
            milestones={milestones}
            onAddMilestone={handleAddMilestone}
            onDeleteMilestone={handleDeleteMilestone}
            onLikeMilestone={handleLikeMilestone}
          />
        )}

        {activeTab === 'gallery' && (
          <GallerySection
            albums={albums}
            photos={photos}
            onAddPhoto={handleAddPhoto}
            onDeletePhoto={handleDeletePhoto}
            onAddAlbum={handleAddAlbum}
          />
        )}

        {activeTab === 'notes' && (
          <LoveDiarySection
            notes={notes}
            husbandName={profile.husbandName}
            wifeName={profile.wifeName}
            onAddNote={handleAddNote}
            onDeleteNote={handleDeleteNote}
          />
        )}

        {activeTab === 'bucket' && (
          <BucketListSection
            bucketItems={bucketList}
            onAddBucketItem={handleAddBucketItem}
            onToggleBucketItem={handleToggleBucketItem}
            onDeleteBucketItem={handleDeleteBucketItem}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-rose-100 text-center text-xs text-slate-500">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
          <span className="font-handwriting text-xl text-rose-600 font-bold">
            Phan Thanh Tuấn (Bil) ❤️ Nguyễn Ngọc Dương (Napi)
          </span>
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
        </div>
        <p>Ghi lại hành trình tình yêu & những năm tháng bình yên bên nhau</p>
      </footer>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        profile={profile}
        onClose={() => setIsSettingsOpen(false)}
        onSave={(updated) => setProfile(updated)}
      />

      {/* Guide Modal */}
      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}

export default App;
