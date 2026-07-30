import React, { useState } from 'react';
import { Calendar, MapPin, Heart, Plus, Search, Filter, Trash2, Camera, Sparkles } from 'lucide-react';
import { MemoryMilestone } from '../types';

interface TimelineSectionProps {
  milestones: MemoryMilestone[];
  onAddMilestone: (milestone: MemoryMilestone) => void;
  onDeleteMilestone: (id: string) => void;
  onLikeMilestone: (id: string) => void;
}

const CATEGORY_MAP: Record<string, { label: string; icon: string; color: string }> = {
  all: { label: 'Tất Cả', icon: '✨', color: 'bg-rose-100 text-rose-700' },
  dating: { label: 'Hẹn Hò', icon: '☕', color: 'bg-pink-100 text-pink-700' },
  wedding: { label: 'Ngày Cưới', icon: '💍', color: 'bg-amber-100 text-amber-800' },
  travel: { label: 'Du Lịch', icon: '✈️', color: 'bg-sky-100 text-sky-700' },
  home: { label: 'Tổ Ấm', icon: '🏡', color: 'bg-emerald-100 text-emerald-700' },
  anniversary: { label: 'Kỷ Niệm', icon: '🎉', color: 'bg-purple-100 text-purple-700' },
  other: { label: 'Khác', icon: '❤️', color: 'bg-slate-100 text-slate-700' },
};

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  milestones,
  onAddMilestone,
  onDeleteMilestone,
  onLikeMilestone,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State for new memory
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newLocation, setNewLocation] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState<MemoryMilestone['category']>('dating');
  const [newImageUrl, setNewImageUrl] = useState('');

  // Handle File Upload to Base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    const newItem: MemoryMilestone = {
      id: 'm_' + Date.now(),
      title: newTitle.trim(),
      date: newDate,
      location: newLocation.trim() || undefined,
      description: newDescription.trim(),
      imageUrl: newImageUrl || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=80',
      category: newCategory,
      likesCount: 1,
    };

    onAddMilestone(newItem);
    setIsAddModalOpen(false);

    // Reset Form
    setNewTitle('');
    setNewDate(new Date().toISOString().split('T')[0]);
    setNewLocation('');
    setNewDescription('');
    setNewImageUrl('');
  };

  // Filter Milestones
  const filteredMilestones = milestones
    .filter((m) => {
      const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
      const matchesSearch =
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (m.location && m.location.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <section className="py-8 px-4 max-w-5xl mx-auto">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-serif-display text-slate-800 flex items-center gap-2">
            <span>Dòng Thời Gian Kỷ Niệm</span>
            <span className="text-rose-500 text-sm font-handwriting">Love Story</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Những mốc sự kiện đánh dấu hành trình tình yêu đẹp đẽ của hai vợ chồng
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-medium text-sm shadow-lg shadow-rose-500/30 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Kỷ Niệm Mới</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-rose-100 mb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {Object.entries(CATEGORY_MAP).map(([key, info]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                selectedCategory === key
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'bg-rose-50/60 hover:bg-rose-100/80 text-slate-700 border border-rose-100'
              }`}
            >
              <span>{info.icon}</span>
              <span>{info.label}</span>
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm kỷ niệm theo tên, địa điểm hoặc từ khóa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-400/50"
          />
        </div>
      </div>

      {/* Timeline Stream */}
      {filteredMilestones.length === 0 ? (
        <div className="text-center py-12 bg-white/60 rounded-3xl border border-dashed border-rose-200 p-8">
          <Sparkles className="w-12 h-12 text-rose-300 mx-auto mb-3" />
          <p className="text-slate-600 font-medium">Chưa tìm thấy kỷ niệm nào phù hợp</p>
          <p className="text-xs text-slate-400 mt-1">Hãy nhấn "Thêm Kỷ Niệm Mới" để lưu giữ khoảnh khắc đầu tiên nhé!</p>
        </div>
      ) : (
        <div className="relative border-l-2 border-rose-200 ml-4 md:ml-32 space-y-8 pl-6 md:pl-8">
          {filteredMilestones.map((item) => {
            const catInfo = CATEGORY_MAP[item.category] || CATEGORY_MAP.other;
            const formattedDate = new Date(item.date).toLocaleDateString('vi-VN', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            });

            return (
              <div key={item.id} className="relative group">
                {/* Timeline Heart Dot */}
                <div className="absolute -left-[31px] md:-left-[39px] top-4 w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center border-4 border-rose-50 shadow-md group-hover:scale-110 transition-transform">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                </div>

                {/* Date tag for desktop view */}
                <div className="hidden md:block absolute -left-36 top-4 w-28 text-right text-xs font-semibold text-rose-600 font-mono">
                  {formattedDate}
                </div>

                {/* Milestone Card */}
                <div className="bg-white rounded-3xl p-5 md:p-6 shadow-md hover:shadow-xl transition-all border border-rose-100/80 overflow-hidden">
                  {/* Category & Mobile Date */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${catInfo.color}`}>
                      {catInfo.icon} {catInfo.label}
                    </span>
                    <span className="md:hidden text-xs font-medium text-rose-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formattedDate}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2 font-serif-display">
                    {item.title}
                  </h3>

                  {item.location && (
                    <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      <span>{item.location}</span>
                    </p>
                  )}

                  <p className="text-sm text-slate-600 leading-relaxed mb-4 whitespace-pre-line">
                    {item.description}
                  </p>

                  {/* Photo Preview if exists */}
                  {item.imageUrl && (
                    <div className="mb-4 rounded-2xl overflow-hidden max-h-80 bg-slate-100 border border-slate-100">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  {/* Card Actions Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <button
                      onClick={() => onLikeMilestone(item.id)}
                      className="flex items-center gap-1.5 text-xs text-rose-500 font-medium hover:scale-105 transition-transform"
                    >
                      <Heart className="w-4 h-4 fill-rose-500" />
                      <span>{item.likesCount} Yêu Thích</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm('Bạn có chắc chắn muốn xóa kỷ niệm này?')) {
                          onDeleteMilestone(item.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors rounded-full hover:bg-rose-50"
                      title="Xóa kỷ niệm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Memory Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-rose-100 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold font-serif-display text-slate-800 mb-1">
              Thêm Kỷ Niệm Tình Yêu Mới
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Lưu trữ những khoảnh khắc đẹp đáng nhớ cùng người thương
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tiêu đề kỷ niệm *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Chuyến du lịch Sa Pa mùa tuyết rơi"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Ngày diễn ra *
                  </label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Danh mục
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as MemoryMilestone['category'])}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none bg-white"
                  >
                    <option value="dating">☕ Hẹn Hò</option>
                    <option value="wedding">💍 Ngày Cưới</option>
                    <option value="travel">✈️ Du Lịch</option>
                    <option value="home">🏡 Tổ Ấm</option>
                    <option value="anniversary">🎉 Kỷ Niệm</option>
                    <option value="other">❤️ Khác</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Địa điểm
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Sa Pa, Lào Cai"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Cảm xúc / Lời nhắn kỷ niệm *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Viết vài dòng cảm xúc hoặc câu chuyện đáng nhớ..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />
              </div>

              {/* Image Upload Input or URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tải Ảnh Lên Hoặc Dán Link Ảnh
                </label>
                <div className="flex gap-2 mb-2">
                  <label className="cursor-pointer flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium border border-slate-200 w-full">
                    <Camera className="w-4 h-4 text-rose-500" />
                    <span>Chọn ảnh từ máy</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <input
                  type="url"
                  placeholder="Hoặc dán URL hình ảnh (https://...)"
                  value={newImageUrl.startsWith('data:') ? '' : newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />

                {newImageUrl && (
                  <div className="mt-2 relative w-full h-32 rounded-xl overflow-hidden border border-slate-200">
                    <img src={newImageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-medium bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/20"
                >
                  Lưu Kỷ Niệm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
