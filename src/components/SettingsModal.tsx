import React, { useState } from 'react';
import { X, Heart, Save, Camera, Music } from 'lucide-react';
import { CoupleProfile } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  profile: CoupleProfile;
  onClose: () => void;
  onSave: (updatedProfile: CoupleProfile) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  profile,
  onClose,
  onSave,
}) => {
  const [husbandName, setHusbandName] = useState(profile.husbandName);
  const [wifeName, setWifeName] = useState(profile.wifeName);
  const [husbandAvatar, setHusbandAvatar] = useState(profile.husbandAvatar);
  const [wifeAvatar, setWifeAvatar] = useState(profile.wifeAvatar);
  const [coverImage, setCoverImage] = useState(profile.coverImage);
  const [startDate, setStartDate] = useState(profile.startDate);
  const [anniversaryType, setAnniversaryType] = useState(profile.anniversaryType);
  const [loveQuote, setLoveQuote] = useState(profile.loveQuote);
  const [musicUrl, setMusicUrl] = useState(profile.backgroundMusicUrl || '');

  if (!isOpen) return null;

  const handleAvatarUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      husbandName: husbandName.trim() || 'Chồng',
      wifeName: wifeName.trim() || 'Vợ',
      husbandAvatar: husbandAvatar,
      wifeAvatar: wifeAvatar,
      coverImage: coverImage,
      startDate: startDate,
      anniversaryType: anniversaryType,
      loveQuote: loveQuote.trim(),
      backgroundMusicUrl: musicUrl.trim() || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-rose-100 max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
          <h3 className="text-xl font-bold font-serif-display text-slate-800">
            Tùy Chỉnh Thông Tin Hai Vợ Chồng
          </h3>
        </div>
        <p className="text-xs text-slate-500 mb-6">
          Thay đổi tên, hình ảnh đại diện, ngày kỷ niệm và nhạc nền cho trang web
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Couple Names */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tên Chồng
              </label>
              <input
                type="text"
                required
                value={husbandName}
                onChange={(e) => setHusbandName(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tên Vợ
              </label>
              <input
                type="text"
                required
                value={wifeName}
                onChange={(e) => setWifeName(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Avatars */}
          <div className="grid grid-cols-2 gap-4 bg-rose-50/50 p-4 rounded-2xl border border-rose-100">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ảnh Đại Diện Chồng
              </label>
              <div className="flex items-center gap-3">
                <img
                  src={husbandAvatar}
                  alt="Husband"
                  className="w-12 h-12 rounded-full object-cover border-2 border-rose-300"
                />
                <label className="cursor-pointer text-xs font-medium px-3 py-1.5 bg-white border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors inline-flex items-center gap-1">
                  <Camera className="w-3.5 h-3.5 text-rose-500" />
                  <span>Chọn ảnh</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleAvatarUpload(e, setHusbandAvatar)}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ảnh Đại Diện Vợ
              </label>
              <div className="flex items-center gap-3">
                <img
                  src={wifeAvatar}
                  alt="Wife"
                  className="w-12 h-12 rounded-full object-cover border-2 border-rose-300"
                />
                <label className="cursor-pointer text-xs font-medium px-3 py-1.5 bg-white border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors inline-flex items-center gap-1">
                  <Camera className="w-3.5 h-3.5 text-rose-500" />
                  <span>Chọn ảnh</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleAvatarUpload(e, setWifeAvatar)}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Start Date & Type */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ngày Bắt Đầu / Ngày Cưới *
              </label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Loại Ngày Kỷ Niệm
              </label>
              <select
                value={anniversaryType}
                onChange={(e) =>
                  setAnniversaryType(e.target.value as 'dating' | 'wedding')
                }
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none bg-white"
              >
                <option value="wedding">💍 Ngày Cưới (Đã Về Chung Nhà)</option>
                <option value="dating">☕ Ngày Yêu / Hẹn Hò First Date</option>
              </select>
            </div>
          </div>

          {/* Love Quote */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Châm Ngôn / Lời Yêu Thương Banner
            </label>
            <textarea
              rows={2}
              value={loveQuote}
              onChange={(e) => setLoveQuote(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
            />
          </div>

          {/* Cover & Music URLs */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ảnh Bìa Top Banner (URL)
              </label>
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Music className="w-3.5 h-3.5 text-rose-500" />
                <span>Link Nhạc Nền MP3 (Tùy chọn)</span>
              </label>
              <input
                type="url"
                placeholder="Ví dụ: https://.../romantic-piano.mp3"
                value={musicUrl}
                onChange={(e) => setMusicUrl(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100"
            >
              Hủy Bỏ
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-medium bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/20"
            >
              <Save className="w-4 h-4" />
              <span>Lưu Tùy Chỉnh</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
