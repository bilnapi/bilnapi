import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Calendar } from 'lucide-react';

interface DaysCounterProps {
  startDate: string;
  anniversaryType: 'dating' | 'wedding';
  husbandName: string;
  wifeName: string;
}

export const DaysCounter: React.FC<DaysCounterProps> = ({
  startDate,
  anniversaryType,
  husbandName,
  wifeName,
}) => {
  const [timeDiff, setTimeDiff] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeDiff({ days: totalDays, hours, minutes, seconds, totalDays });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  // Format start date to Vietnamese date string
  const formattedStartDate = new Date(startDate).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="bg-white/80 backdrop-blur-md border border-rose-100 shadow-xl rounded-3xl p-6 md:p-8 text-center max-w-3xl mx-auto my-6 relative overflow-hidden">
      {/* Decorative background hearts */}
      <div className="absolute -top-10 -left-10 text-rose-100 pointer-events-none opacity-40">
        <Heart size={120} fill="currentColor" />
      </div>
      <div className="absolute -bottom-10 -right-10 text-rose-100 pointer-events-none opacity-40">
        <Heart size={120} fill="currentColor" />
      </div>

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/70 text-rose-700 text-sm font-medium mb-3">
          <Sparkles className="w-4 h-4 text-rose-500 animate-pulse" />
          <span>
            {anniversaryType === 'wedding' ? 'Đã Về Chung Một Nhà' : 'Đã Cắn nhau được'}
          </span>
          <Sparkles className="w-4 h-4 text-rose-500 animate-pulse" />
        </div>

        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-bounce" />
          <h2 className="text-4xl md:text-6xl font-bold font-serif-display text-slate-800 tracking-tight">
            <span className="text-rose-600">{timeDiff.totalDays}</span> NGÀY
          </h2>
          <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-bounce" />
        </div>

        {/* Detailed Counter Breakdown */}
        <div className="grid grid-cols-4 gap-2 md:gap-4 my-6 max-w-xl mx-auto">
          <div className="bg-rose-50/80 border border-rose-100 rounded-2xl p-3 md:p-4">
            <span className="block text-2xl md:text-4xl font-bold text-rose-600 font-mono">
              {timeDiff.days}
            </span>
            <span className="text-xs md:text-sm text-slate-600 font-medium">Ngày</span>
          </div>

          <div className="bg-rose-50/80 border border-rose-100 rounded-2xl p-3 md:p-4">
            <span className="block text-2xl md:text-4xl font-bold text-rose-600 font-mono">
              {String(timeDiff.hours).padStart(2, '0')}
            </span>
            <span className="text-xs md:text-sm text-slate-600 font-medium">Giờ</span>
          </div>

          <div className="bg-rose-50/80 border border-rose-100 rounded-2xl p-3 md:p-4">
            <span className="block text-2xl md:text-4xl font-bold text-rose-600 font-mono">
              {String(timeDiff.minutes).padStart(2, '0')}
            </span>
            <span className="text-xs md:text-sm text-slate-600 font-medium">Phút</span>
          </div>

          <div className="bg-rose-50/80 border border-rose-100 rounded-2xl p-3 md:p-4">
            <span className="block text-2xl md:text-4xl font-bold text-rose-600 font-mono">
              {String(timeDiff.seconds).padStart(2, '0')}
            </span>
            <span className="text-xs md:text-sm text-slate-600 font-medium">Giây</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-rose-100/60 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs md:text-sm text-slate-500">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Yêu nhau từ ngày: <strong className="text-slate-700">{formattedStartDate}</strong></span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5 text-rose-600 font-bold">
            <span className="rainbow-text text-sm md:text-base">{husbandName}</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline shrink-0" />
            <span className="rainbow-text text-sm md:text-base">{wifeName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
