import { CoupleProfile, MemoryMilestone, PhotoAlbum, PhotoItem, LoveNote, BucketItem } from '../types';
import tuanAvatarImg from '../assets/images/tuan_avatar_1785401546929.jpg';
import duongAvatarImg from '../assets/images/duong_avatar_1785401566596.jpg';

export const initialProfile: CoupleProfile = {
  husbandName: '•Ba Bé Sữa',
  wifeName: '•Mẹ Bé Đậu',
  husbandAvatar: tuanAvatarImg,
  wifeAvatar: duongAvatarImg,
  coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
  startDate: '2026-03-19',
  anniversaryType: 'dating',
  loveQuote: '"Cảm ơn em đã cùng anh đồng hành, chia sẻ và biến mọi khoảnh khắc thường nhật thành kỷ niệm vô giá."',
  backgroundMusicUrl: 'https://zingmp3.vn/album/Thuong-Single-Karik/ZWZCWAUB.html',
};

export const initialMilestones: MemoryMilestone[] = [];

export const initialAlbums: PhotoAlbum[] = [];

export const initialPhotos: PhotoItem[] = [];

export const initialNotes: LoveNote[] = [];

export const initialBucketList: BucketItem[] = [];

