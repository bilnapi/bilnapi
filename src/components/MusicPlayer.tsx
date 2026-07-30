import React, { useRef, useEffect } from 'react';
import { Music, Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  musicUrl: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  musicUrl,
  isPlaying,
  onTogglePlay,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // Autoplay policy restriction may occur until user clicks
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, musicUrl]);

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2 bg-slate-900/90 text-white backdrop-blur-md px-4 py-2.5 rounded-full shadow-2xl border border-rose-500/30">
      <audio ref={audioRef} src={musicUrl} loop />

      <div className="flex items-center gap-2">
        <span className="w-7 h-7 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400">
          <Music className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''}`} />
        </span>
        <div className="hidden sm:block text-[11px]">
          <span className="block font-semibold text-rose-200">Giai Điệu Tình Yêu</span>
          <span className="block text-[10px] text-slate-400">Romantic Piano</span>
        </div>
      </div>

      <button
        onClick={onTogglePlay}
        className="p-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white transition-all shadow-md ml-1"
        title={isPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc'}
      >
        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
      </button>
    </div>
  );
};
