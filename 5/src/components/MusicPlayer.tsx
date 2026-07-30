import React, { useRef, useEffect } from 'react';
import { Music, Play, Pause, ExternalLink } from 'lucide-react';

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

  // Extract YouTube ID if it's a YouTube link
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Extract ZingMP3 embed URL if it's a ZingMP3 link
  const getZingMp3EmbedUrl = (url: string) => {
    if (!url || !url.includes('zingmp3.vn')) return null;
    const isAlbum = url.includes('/album/') || url.includes('/embed/album/');
    const match = url.match(/(?:album|bai-hat|song|video|embed\/[a-z]+)\/[^/]*?([A-Z0-9]{8})/i) || url.match(/([A-Z0-9]{8})/i);
    if (match && match[1]) {
      const code = match[1];
      const type = isAlbum ? 'album' : 'song';
      return `https://zingmp3.vn/embed/${type}/${code}?start=${isPlaying ? 'true' : 'false'}`;
    }
    return null;
  };

  const youtubeId = getYouTubeId(musicUrl);
  const zingEmbedUrl = getZingMp3EmbedUrl(musicUrl);

  useEffect(() => {
    if (audioRef.current && !youtubeId && !zingEmbedUrl) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // Handled by user interaction
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, musicUrl, youtubeId, zingEmbedUrl]);

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2 bg-slate-900/90 text-white backdrop-blur-md px-4 py-2.5 rounded-full shadow-2xl border border-rose-500/30">
      {zingEmbedUrl ? (
        isPlaying ? (
          <iframe
            src={zingEmbedUrl}
            className="hidden"
            allow="autoplay"
            title="Background Music ZingMP3"
          />
        ) : null
      ) : youtubeId ? (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${isPlaying ? 1 : 0}&enablejsapi=1&loop=1&playlist=${youtubeId}`}
          className="hidden"
          allow="autoplay"
          title="Background Music YouTube"
        />
      ) : (
        <audio ref={audioRef} src={musicUrl} loop />
      )}

      <div className="flex items-center gap-2">
        <span className="w-7 h-7 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400">
          <Music className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''}`} />
        </span>
        <div className="hidden sm:block text-[11px]">
          <span className="block font-semibold text-rose-200">Thương - Karik 💖</span>
          <span className="block text-[10px] text-slate-400">
            {isPlaying ? 'Đang phát...' : 'Nhấn để bật nhạc'}
          </span>
        </div>
      </div>

      <button
        onClick={onTogglePlay}
        className="p-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white transition-all shadow-md ml-1"
        title={isPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc Thương - Karik'}
      >
        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
      </button>

      {musicUrl.includes('zingmp3.vn') && (
        <a
          href={musicUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 text-slate-400 hover:text-rose-300 transition-colors"
          title="Mở trên ZingMP3"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )}
    </div>
  );
};

