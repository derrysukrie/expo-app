export interface Root {
  data: Daum[];
  pagination: Pagination;
}

export interface Daum {
  id: string;
  createdAt: string;
  lastUpdatedAt: string;
  publishedAt: string;
  image: string;
  imagePlaceholder: string;
  title: string;
  slug: string;
  description: string;
  language: any;
  featured: boolean;
  editorPick: boolean;
  authorId: any;
  author: any;
  channelId: string;
  channel: Channel;
  externalData: ExternalData;
  statsId: string;
  stats: Stats;
  tags: Tag[];
}

export interface Channel {
  id: string;
  createdAt: string;
  lastUpdatedAt: string;
  handle: string;
  name: string;
  about: string;
  image: string;
  imagePlaceholder: string;
  type: string;
  public: boolean;
  country: any;
  mainLanguage: any;
  verified: boolean;
  ownerId: any;
}

export interface ExternalData {
  id: string;
  sourceId: string;
  link: string;
  imageOrigin: string;
  authorName?: string;
  authorAvatar?: string;
  authorAvatarOrigin?: string;
  authorAvatarPlaceholder?: string;
  authorId: string;
  postId: string;
}

export interface Stats {
  id: string;
  lastUpdatedAt: string;
  impressionStatsId: string;
  readStatsId: string;
  shareStatsId: string;
  impression: Impression;
  read: Read;
  share: Share;
}

export interface Impression {
  id: string;
  daily: number;
  weekly: number;
  monthly: number;
  yearly: number;
}

export interface Read {
  id: string;
  daily: number;
  weekly: number;
  monthly: number;
  yearly: number;
}

export interface Share {
  id: string;
  daily: number;
  weekly: number;
  monthly: number;
  yearly: number;
}

export interface Tag {
  id: string;
  createdAt: string;
  lastUpdatedAt: string;
  handle: string;
}

export interface Pagination {
  total: number;
  cursors: Cursors;
  prev: any;
  next: string;
}

export interface Cursors {
  before: any;
  after: string;
}
