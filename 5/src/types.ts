export interface CoupleProfile {
  husbandName: string;
  wifeName: string;
  husbandAvatar: string;
  wifeAvatar: string;
  coverImage: string;
  startDate: string; // YYYY-MM-DD
  anniversaryType: 'dating' | 'wedding';
  loveQuote: string;
  backgroundMusicUrl?: string;
}

export interface MemoryMilestone {
  id: string;
  title: string;
  date: string;
  location?: string;
  description: string;
  imageUrl?: string;
  category: 'dating' | 'wedding' | 'travel' | 'anniversary' | 'home' | 'other';
  likesCount: number;
}

export interface PhotoAlbum {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
}

export interface PhotoItem {
  id: string;
  albumId: string;
  title: string;
  imageUrl: string;
  date: string;
  caption?: string;
}

export interface LoveNote {
  id: string;
  sender: 'husband' | 'wife';
  recipientName: string;
  content: string;
  date: string;
  mood?: string;
}

export interface BucketItem {
  id: string;
  title: string;
  category: string;
  completed: boolean;
  targetYear?: string;
  note?: string;
}
