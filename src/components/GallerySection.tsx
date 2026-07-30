import React, { useState } from 'react';
import { Camera, Plus, Trash2, X, ChevronLeft, ChevronRight, FolderPlus, Image as ImageIcon, Sparkles } from 'lucide-react';
import { PhotoAlbum, PhotoItem } from '../types';

interface GallerySectionProps {
  albums: PhotoAlbum[];
  photos: PhotoItem[];
  onAddPhoto: (photo: PhotoItem) => void;
  onDeletePhoto: (id: string) => void;
  onAddAlbum: (album: PhotoAlbum) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  albums,
  photos,
  onAddPhoto,
  onDeletePhoto,
  onAddAlbum,
}) => {
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [isAddPhotoModalOpen, setIsAddPhotoModalOpen] = useState(false);
  const [isAddAlbumModalOpen, setIsAddAlbumModalOpen] = useState(false);

  // New Photo Form State
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoAlbumId, setPhotoAlbumId] = useState(albums[0]?.id || 'a1');
  const [photoCaption, setPhotoCaption] = useState('');
  const [photoDate, setPhotoDate] = useState(new Date().toISOString().split('T')[0]);
  const [photoUrl, setPhotoUrl] = useState('');

  // New Album Form State
  const [albumTitle, setAlbumTitle] = useState('');
  const [albumDescription, setAlbumDescription] = useState('');

  // File Uploader
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoUrl) {
      alert('Vui lòng chọn hoặc dán đường dẫn hình ảnh!');
      return;
    }

    const newPhoto: PhotoItem = {
      id: 'p_' + Date.now(),
      albumId: photoAlbumId,
      title: photoTitle.trim() || 'Kỷ niệm yêu thương',
      imageUrl: photoUrl,
      date: photoDate,
      caption: photoCaption.trim() || undefined,
    };

    onAddPhoto(newPhoto);
    setIsAddPhotoModalOpen(false);

    // Reset
    setPhotoTitle('');
    setPhotoCaption('');
    setPhotoUrl('');
  };

  const handleSaveAlbum = (e: React.FormEvent) => {
    e.preventDefault();
    if (!albumTitle.trim()) return;

    const newAlbum: PhotoAlbum = {
      id: 'a_' + Date.now(),
      title: albumTitle.trim(),
      description: albumDescription.trim() || undefined,
      coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    };

    onAddAlbum(newAlbum);
    setSelectedAlbumId(newAlbum.id);
    setIsAddAlbumModalOpen(false);

    setAlbumTitle('');
    setAlbumDescription('');
  };

  // Filtered Photos
  const filteredPhotos = photos.filter((p) => {
    if (selectedAlbumId === 'all') return true;
    return p.albumId === selectedAlbumId;
  });

  // Lightbox handlers
  const handleNextPhoto = () => {
    if (activePhotoIndex !== null && activePhotoIndex < filteredPhotos.length - 1) {
      setActivePhotoIndex(activePhotoIndex + 1);
    }
  };

  const handlePrevPhoto = () => {
    if (activePhotoIndex !== null && activePhotoIndex > 0) {
      setActivePhotoIndex(activePhotoIndex - 1);
    }
  };

  return (
    <section className="py-8 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-serif-display text-slate-800 flex items-center gap-2">
            <span>Bộ Sưu Tập Hình Ảnh</span>
            <span className="text-rose-500 text-sm font-handwriting">Photo Gallery</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Lưu giữ những bức ảnh rạng rỡ, chân thực và ấm áp nhất của hai vợ chồng
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddAlbumModalOpen(true)}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs border border-rose-200 shadow-sm transition-all"
          >
            <FolderPlus className="w-4 h-4 text-rose-500" />
            <span>Tạo Album Mới</span>
          </button>

          <button
            onClick={() => setIsAddPhotoModalOpen(true)}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-medium text-xs shadow-lg shadow-rose-500/30 transition-all hover:scale-105"
          >
            <Camera className="w-4 h-4" />
            <span>Tải Ảnh Mới Lên</span>
          </button>
        </div>
      </div>

      {/* Album Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        <button
          onClick={() => setSelectedAlbumId('all')}
          className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all border ${
            selectedAlbumId === 'all'
              ? 'bg-rose-500 text-white border-rose-500 shadow-md'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-rose-50'
          }`}
        >
          🖼️ Tất Cả Ảnh ({photos.length})
        </button>

        {albums.map((album) => {
          const count = photos.filter((p) => p.albumId === album.id).length;
          return (
            <button
              key={album.id}
              onClick={() => setSelectedAlbumId(album.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedAlbumId === album.id
                  ? 'bg-rose-500 text-white border-rose-500 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-rose-50'
              }`}
            >
              {album.title} ({count})
            </button>
          );
        })}
      </div>

      {/* Photo Grid */}
      {filteredPhotos.length === 0 ? (
        <div className="text-center py-16 bg-white/60 rounded-3xl border border-dashed border-rose-200 p-8">
          <ImageIcon className="w-12 h-12 text-rose-300 mx-auto mb-3" />
          <p className="text-slate-600 font-medium">Chưa có bức ảnh nào trong album này</p>
          <p className="text-xs text-slate-400 mt-1">Nhấn "Tải Ảnh Mới Lên" để tạo bộ sưu tập kỷ niệm nhé!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-rose-100/80 transition-all duration-300"
            >
              <div
                onClick={() => setActivePhotoIndex(index)}
                className="cursor-pointer aspect-4/3 overflow-hidden bg-slate-100 relative"
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-white">
                  <span className="text-xs font-semibold truncate">{photo.title}</span>
                  {photo.caption && (
                    <span className="text-[11px] text-slate-200 line-clamp-1 italic">
                      "{photo.caption}"
                    </span>
                  )}
                </div>
              </div>

              {/* Card Bottom Meta */}
              <div className="p-3 flex items-center justify-between text-xs text-slate-500 border-t border-slate-50">
                <span className="font-mono text-[11px]">{photo.date}</span>
                <button
                  onClick={() => {
                    if (confirm('Bạn có muốn xóa bức ảnh này khỏi bộ sưu tập?')) {
                      onDeletePhoto(photo.id);
                    }
                  }}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded-full hover:bg-rose-50 transition-colors"
                  title="Xóa ảnh"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && filteredPhotos[activePhotoIndex] && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-all z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {activePhotoIndex > 0 && (
            <button
              onClick={handlePrevPhoto}
              className="absolute left-4 p-3 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {activePhotoIndex < filteredPhotos.length - 1 && (
            <button
              onClick={handleNextPhoto}
              className="absolute right-4 p-3 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center">
            <img
              src={filteredPhotos[activePhotoIndex].imageUrl}
              alt={filteredPhotos[activePhotoIndex].title}
              className="max-h-[70vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
            />
            <div className="mt-4 text-center text-white px-4">
              <h4 className="text-lg font-bold font-serif-display">
                {filteredPhotos[activePhotoIndex].title}
              </h4>
              {filteredPhotos[activePhotoIndex].caption && (
                <p className="text-sm text-rose-200 italic mt-1 font-handwriting text-xl">
                  "{filteredPhotos[activePhotoIndex].caption}"
                </p>
              )}
              <span className="text-xs text-slate-400 block mt-1 font-mono">
                {filteredPhotos[activePhotoIndex].date}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Add Photo Modal */}
      {isAddPhotoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-rose-100 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold font-serif-display text-slate-800 mb-1">
              Tải Bức Ảnh Kỷ Niệm Mới
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Lưu trữ bức ảnh đẹp nhất của hai vợ chồng
            </p>

            <form onSubmit={handleSavePhoto} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Chọn Album *
                </label>
                <select
                  value={photoAlbumId}
                  onChange={(e) => setPhotoAlbumId(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none bg-white"
                >
                  {albums.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tên bức ảnh
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Hoàng hôn trên bờ biển"
                  value={photoTitle}
                  onChange={(e) => setPhotoTitle(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ngày chụp
                </label>
                <input
                  type="date"
                  value={photoDate}
                  onChange={(e) => setPhotoDate(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Chú thích / Cảm xúc
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Khoảnh khắc hai đứa cười rạng rỡ nhất"
                  value={photoCaption}
                  onChange={(e) => setPhotoCaption(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />
              </div>

              {/* Upload or URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Chọn Tệp Ảnh Từ Thiết Bị *
                </label>
                <label className="cursor-pointer flex items-center justify-center gap-2 p-3 bg-rose-50 hover:bg-rose-100/80 text-rose-700 rounded-xl text-xs font-medium border border-rose-200 w-full mb-2">
                  <Camera className="w-4 h-4 text-rose-500" />
                  <span>Bấm vào đây để chọn ảnh từ máy/điện thoại</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                <input
                  type="url"
                  placeholder="Hoặc dán URL đường dẫn ảnh (https://...)"
                  value={photoUrl.startsWith('data:') ? '' : photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />

                {photoUrl && (
                  <div className="mt-2 relative w-full h-36 rounded-xl overflow-hidden border border-slate-200">
                    <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddPhotoModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-medium bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/20"
                >
                  Tải Ảnh Lên
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Album Modal */}
      {isAddAlbumModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-rose-100">
            <h3 className="text-xl font-bold font-serif-display text-slate-800 mb-1">
              Tạo Album Kỷ Niệm Mới
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Gộp nhóm các bức ảnh theo chủ đề riêng
            </p>

            <form onSubmit={handleSaveAlbum} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tên Album *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: 💖 Kỷ Niệm Trăng Mật Mũi Né"
                  value={albumTitle}
                  onChange={(e) => setAlbumTitle(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mô tả Album
                </label>
                <input
                  type="text"
                  placeholder="Mô tả ngắn về chủ đề ảnh..."
                  value={albumDescription}
                  onChange={(e) => setAlbumDescription(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddAlbumModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-medium bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/20"
                >
                  Tạo Album
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
