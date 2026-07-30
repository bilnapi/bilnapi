import React from 'react';
import { Heart, Settings, BookOpen, Share2, Music, Sparkles } from 'lucide-react';
import { CoupleProfile } from '../types';

interface HeaderProps {
  profile: CoupleProfile;
  onOpenSettings: () => void;
  onOpenGuide: () => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

const parseName = (fullName: string) => {
  const match = fullName.match(/^(.*?)(?:\s*\((.*?)\))?$/);
  if (match && match[1]) {
    return {
      mainName: match[1].trim(),
      nickname: match[2] ? match[2].trim() : undefined,
    };
  }
  return { mainName: fullName, nickname: undefined };
};

export const Header: React.FC<HeaderProps> = ({
  profile,
  onOpenSettings,
  onOpenGuide,
  isMusicPlaying,
  onToggleMusic,
}) => {
  const husbandInfo = parseName(profile.husbandName);
  const wifeInfo = parseName(profile.wifeName);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Bil ♥ Napi - ${profile.husbandName} ❤️ ${profile.wifeName}`,
        text: profile.loveQuote,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Đã sao chép đường dẫn trang web! Bạn có thể gửi cho người ấy.');
    }
  };

  return (
    <header className="relative w-full overflow-hidden bg-slate-900 text-white rounded-b-[2.5rem] shadow-2xl">
      {/* Cover Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={profile.coverImage}
          alt="Couple Cover"
          className="w-full h-full object-cover object-center opacity-40 blur-[2px] scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-rose-950/40" />
      </div>

      {/* Top Controls Bar */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-rose-500/20 backdrop-blur-md flex items-center justify-center text-rose-300 border border-rose-500/30">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
          </span>
          <span className="text-xs md:text-sm font-semibold tracking-wider uppercase text-rose-200">
            Bil ♥ Napi
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Music Toggle */}
          <button
            onClick={onToggleMusic}
            className={`px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md transition-all flex items-center gap-1.5 border ${
              isMusicPlaying
                ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/30 animate-pulse'
                : 'bg-white/10 text-rose-200 hover:bg-white/20 border-white/20'
            }`}
            title="Nhạc nền: Thương - Karik"
          >
            <Music className={`w-3.5 h-3.5 ${isMusicPlaying ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isMusicPlaying ? 'Tắt Nhạc' : '🎵 Thương - Karik'}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all"
            title="Chia sẻ trang web"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all"
            title="Tùy chỉnh thông tin"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Couple Hero Banner */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-2 pb-12 text-center">
        {/* Avatars & Names Section */}
        <div className="flex items-start justify-center gap-6 sm:gap-14 md:gap-20 my-6">
          {/* Husband Column */}
          <div className="group relative flex flex-col items-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-rose-400/80 shadow-2xl ring-4 ring-rose-500/20 group-hover:scale-105 transition-transform duration-300">
              <img
                src={profile.husbandAvatar}
                alt="•Ba Bé Sữa"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="mt-3.5 text-xl sm:text-2xl md:text-3xl font-extrabold font-serif-display rainbow-text tracking-wide drop-shadow-md text-center">
              •Ba Bé Sữa
            </h1>
          </div>

          {/* Pulsing Heart Center Connector */}
          <div className="flex flex-col items-center justify-center pt-5 sm:pt-7 md:pt-10">
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center shadow-xl shadow-rose-500/50 animate-pulse border-2 border-white">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white fill-white" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-4 h-4 sm:w-5 sm:h-5 text-amber-300 animate-spin" />
            </div>
            <span className="text-xl sm:text-2xl md:text-3xl font-extrabold rainbow-text mt-2">
              ♥
            </span>
          </div>

          {/* Wife Column */}
          <div className="group relative flex flex-col items-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-rose-400/80 shadow-2xl ring-4 ring-rose-500/20 group-hover:scale-105 transition-transform duration-300">
              <img
                src={profile.wifeAvatar}
                alt="•Mẹ Bé Đậu"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="mt-3.5 text-xl sm:text-2xl md:text-3xl font-extrabold font-serif-display rainbow-text tracking-wide drop-shadow-md text-center">
              •Mẹ Bé Đậu
            </h1>
          </div>
        </div>

        <p className="max-w-2xl mx-auto text-sm md:text-lg font-handwriting text-rose-100 italic leading-relaxed px-4 py-2 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 mt-4">
          {profile.loveQuote}
        </p>
      </div>
    </header>
  );
};
