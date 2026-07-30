import React, { useState } from 'react';
import { Heart, Send, MessageCircle, Sparkles, Trash2, Smile } from 'lucide-react';
import { LoveNote } from '../types';

interface LoveDiarySectionProps {
  notes: LoveNote[];
  husbandName: string;
  wifeName: string;
  onAddNote: (note: LoveNote) => void;
  onDeleteNote: (id: string) => void;
}

export const LoveDiarySection: React.FC<LoveDiarySectionProps> = ({
  notes,
  husbandName,
  wifeName,
  onAddNote,
  onDeleteNote,
}) => {
  const [sender, setSender] = useState<'husband' | 'wife'>('husband');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('❤️ Trân trọng');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const recipientName = sender === 'husband' ? wifeName : husbandName;

    const newNote: LoveNote = {
      id: 'n_' + Date.now(),
      sender,
      recipientName: recipientName,
      content: content.trim(),
      date: new Date().toISOString().split('T')[0],
      mood,
    };

    onAddNote(newNote);
    setContent('');
  };

  return (
    <section className="py-8 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Gửi Lời Yêu Thương Cho Nhau</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold font-serif-display text-slate-800">
          Nhật Ký & Bức Thư Tình Yêu
        </h2>
        <p className="text-xs md:text-sm text-slate-500 mt-1 max-w-xl mx-auto">
          Nơi hai vợ chồng gửi gắm những lời cảm ơn, động viên và tâm sự chân thành nhất
        </p>
      </div>

      {/* Write Note Form */}
      <div className="bg-gradient-to-br from-rose-50 to-pink-50/60 rounded-3xl p-6 shadow-md border border-rose-100 mb-10">
        <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Send className="w-4 h-4 text-rose-500" />
          <span>Viết Lời Nhắn Mới</span>
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <span className="block text-xs font-semibold text-slate-600 mb-1">Người gửi:</span>
              <div className="inline-flex rounded-xl p-1 bg-white border border-rose-200">
                <button
                  type="button"
                  onClick={() => setSender('husband')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    sender === 'husband'
                      ? 'bg-rose-500 text-white shadow-sm'
                      : 'text-slate-600 hover:text-rose-500'
                  }`}
                >
                  Chồng ({husbandName})
                </button>
                <button
                  type="button"
                  onClick={() => setSender('wife')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    sender === 'wife'
                      ? 'bg-rose-500 text-white shadow-sm'
                      : 'text-slate-600 hover:text-rose-500'
                  }`}
                >
                  Vợ ({wifeName})
                </button>
              </div>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-semibold text-slate-600 mb-1">Cảm xúc:</label>
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-rose-200 rounded-xl text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none"
              >
                <option value="❤️ Trân trọng">❤️ Trân trọng</option>
                <option value="🌸 Hạnh phúc">🌸 Hạnh phúc</option>
                <option value="☕ Ấm áp">☕ Ấm áp</option>
                <option value="✨ Nhớ thương">✨ Nhớ thương</option>
                <option value="💪 Cùng cố gắng">💪 Cùng cố gắng</option>
              </select>
            </div>
          </div>

          <div>
            <textarea
              required
              rows={3}
              placeholder={
                sender === 'husband'
                  ? `Viết vài dòng gửi cho vợ yêu ${wifeName}...`
                  : `Viết vài dòng gửi cho chồng yêu ${husbandName}...`
              }
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-4 bg-white border border-rose-200 rounded-2xl text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none placeholder:text-slate-400 shadow-inner"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-medium text-xs rounded-full shadow-md shadow-rose-500/30 transition-all hover:scale-105"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Gửi Lời Yêu Thương</span>
            </button>
          </div>
        </form>
      </div>

      {/* Notes Stream */}
      <div className="space-y-4">
        {notes.length === 0 ? (
          <div className="text-center py-10 bg-white/60 rounded-3xl border border-dashed border-rose-200 p-6">
            <MessageCircle className="w-10 h-10 text-rose-300 mx-auto mb-2" />
            <p className="text-slate-600 text-sm font-medium">Chưa có bức thư tình nào</p>
            <p className="text-xs text-slate-400 mt-0.5">Hãy viết những lời ngọt ngào đầu tiên cho người ấy nhé!</p>
          </div>
        ) : (
          notes.map((note) => {
            const isHusbandSender = note.sender === 'husband';
            const senderDisplayName = isHusbandSender ? husbandName : wifeName;
            const recipientDisplayName = isHusbandSender ? wifeName : husbandName;

            return (
              <div
                key={note.id}
                className="bg-white rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow border border-rose-100 relative group overflow-hidden"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 text-xs font-bold">
                      {isHusbandSender ? '👨' : '👩'}
                    </span>
                    <div>
                      <span className="text-xs font-bold text-slate-800">
                        {senderDisplayName}
                      </span>
                      <span className="text-xs text-slate-400 font-medium ml-1">
                        gửi <strong className="text-rose-500">{recipientDisplayName}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {note.mood && (
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 font-medium">
                        {note.mood}
                      </span>
                    )}
                    <span className="text-xs font-mono text-slate-400">{note.date}</span>
                    <button
                      onClick={() => onDeleteNote(note.id)}
                      className="p-1 text-slate-300 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-all rounded-full hover:bg-rose-50"
                      title="Xóa lời nhắn"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-sm md:text-base text-slate-700 leading-relaxed font-handwriting text-xl px-2 py-1">
                  "{note.content}"
                </p>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
