import React, { useState } from 'react';
import { CheckCircle2, Circle, Plus, Sparkles, Target, Trash2 } from 'lucide-react';
import { BucketItem } from '../types';

interface BucketListSectionProps {
  bucketItems: BucketItem[];
  onAddBucketItem: (item: BucketItem) => void;
  onToggleBucketItem: (id: string) => void;
  onDeleteBucketItem: (id: string) => void;
}

export const BucketListSection: React.FC<BucketListSectionProps> = ({
  bucketItems,
  onAddBucketItem,
  onToggleBucketItem,
  onDeleteBucketItem,
}) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Du lịch');
  const [targetYear, setTargetYear] = useState('2025');
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newItem: BucketItem = {
      id: 'b_' + Date.now(),
      title: title.trim(),
      category: category.trim(),
      completed: false,
      targetYear: targetYear.trim() || undefined,
      note: note.trim() || undefined,
    };

    onAddBucketItem(newItem);
    setIsAddModalOpen(false);

    setTitle('');
    setNote('');
  };

  const totalCount = bucketItems.length;
  const completedCount = bucketItems.filter((i) => i.completed).length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const filteredItems = bucketItems.filter((item) => {
    if (filter === 'active') return !item.completed;
    if (filter === 'completed') return item.completed;
    return true;
  });

  return (
    <section className="py-8 px-4 max-w-4xl mx-auto">
      {/* Header & Progress */}
      <div className="bg-white rounded-3xl p-6 shadow-md border border-rose-100 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold mb-2">
              <Target className="w-3.5 h-3.5" />
              <span>Những Ước Mơ Cùng Nhau</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-serif-display text-slate-800">
              Danh Sách Điều Cần Làm (Bucket List)
            </h2>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              Những địa điểm muốn đi, dự định tương lai và trải nghiệm đáng nhớ hai vợ chồng cùng thực hiện
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-medium text-xs shadow-md shadow-rose-500/30 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Mục Tiêu Mới</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>Tiến độ hoàn thành</span>
            <span className="text-rose-600 font-mono">
              {completedCount} / {totalCount} mục ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-3 bg-rose-100/70 rounded-full overflow-hidden p-0.5 border border-rose-200">
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-500 shadow-inner"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
            filter === 'all'
              ? 'bg-rose-500 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-rose-50'
          }`}
        >
          Tất Cả ({totalCount})
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
            filter === 'active'
              ? 'bg-rose-500 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-rose-50'
          }`}
        >
          Chưa Làm ({totalCount - completedCount})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
            filter === 'completed'
              ? 'bg-rose-500 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-rose-50'
          }`}
        >
          Đã Hoàn Thành ({completedCount})
        </button>
      </div>

      {/* Bucket List Items */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-white/60 rounded-3xl border border-dashed border-rose-200 p-6">
            <Sparkles className="w-10 h-10 text-rose-300 mx-auto mb-2" />
            <p className="text-slate-600 text-sm font-medium">Chưa có mục tiêu nào trong danh sách</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl p-4 shadow-sm border transition-all flex items-start gap-3.5 group ${
                item.completed ? 'border-emerald-200 bg-emerald-50/20' : 'border-rose-100 hover:border-rose-300'
              }`}
            >
              <button
                onClick={() => onToggleBucketItem(item.id)}
                className="mt-0.5 text-slate-300 hover:text-rose-500 transition-colors"
              >
                {item.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 hover:text-rose-500" />
                )}
              </button>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4
                    className={`text-sm font-bold ${
                      item.completed ? 'line-through text-slate-400' : 'text-slate-800'
                    }`}
                  >
                    {item.title}
                  </h4>
                  <span className="px-2 py-0.5 bg-rose-50 text-rose-600 text-[10px] font-semibold rounded-md border border-rose-100">
                    {item.category}
                  </span>
                  {item.targetYear && (
                    <span className="text-[10px] text-slate-400 font-mono">
                      Mục tiêu: {item.targetYear}
                    </span>
                  )}
                </div>

                {item.note && (
                  <p className="text-xs text-slate-500 mt-1 italic font-handwriting text-lg">
                    "{item.note}"
                  </p>
                )}
              </div>

              <button
                onClick={() => onDeleteBucketItem(item.id)}
                className="p-1 text-slate-300 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-all rounded-full hover:bg-rose-50"
                title="Xóa mục tiêu"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add Bucket Item Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-rose-100">
            <h3 className="text-xl font-bold font-serif-display text-slate-800 mb-1">
              Thêm Mục Tiêu Mới
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Lên danh sách điều ước hai vợ chồng sẽ cùng hoàn thành
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Điều muốn cùng làm *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Du lịch Nhật Bản mùa hoa anh đào"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Chủ đề
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none bg-white"
                  >
                    <option value="Du lịch">✈️ Du lịch</option>
                    <option value="Gia đình">🏡 Gia đình</option>
                    <option value="Sở thích">🎨 Sở thích</option>
                    <option value="Kỷ niệm">🎉 Kỷ niệm</option>
                    <option value="Tài chính">💰 Tài chính</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Năm dự kiến
                  </label>
                  <input
                    type="text"
                    placeholder="2025"
                    value={targetYear}
                    onChange={(e) => setTargetYear(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ghi chú chi tiết
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Đi ăn ramen nóng ở Kyoto..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-medium bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/20"
                >
                  Lưu Mục Tiêu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
