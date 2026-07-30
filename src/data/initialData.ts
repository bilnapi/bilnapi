import { CoupleProfile, MemoryMilestone, PhotoAlbum, PhotoItem, LoveNote, BucketItem } from '../types';

export const initialProfile: CoupleProfile = {
  husbandName: 'Phan Thanh Tuấn ( Bil )',
  wifeName: 'Nguyễn Ngọc Dương ( Napi )',
  husbandAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  wifeAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
  coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
  startDate: '2026-03-19',
  anniversaryType: 'dating',
  loveQuote: '"Cảm ơn em đã cùng anh đồng hành, chia sẻ và biến mọi khoảnh khắc thường nhật thành kỷ niệm vô giá."',
  backgroundMusicUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3',
};

export const initialMilestones: MemoryMilestone[] = [];

export const initialAlbums: PhotoAlbum[] = [];

export const initialPhotos: PhotoItem[] = [];

export const initialNotes: LoveNote[] = [];

export const initialBucketList: BucketItem[] = [];

