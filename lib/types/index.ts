export type User = {
  email: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"?: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"?: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role"?: string;
};

export type File = {
  id: number;
  name: string;
  size: number;
  type: string;
  previewUrl?: string;
};
export type UserDetail = {
id: number;
  genderId: number;
  userName: string;
  email: string;
  userTypeId: number;
  birthDate: string;
  cityId: number;
  countryId: number;
  coverPictureUrl: string;
  creationDate: string;
  displayName: string;
  isActive: boolean;
  lastLoginAt: string;
  phoneNumber: string;
  prefferedLanguageId: number;
  profilePictureUrl: string;
  status: number;
  country: {
    name: string;
  }
};
export type PostFormType = {
  content: string;
  files?: {
    type: string;
    id: number;
    name: string;
    size: number;
    previewUrl?: string;
    file?: any;
  }[];
  price?: string;
  poll?: {
    options: string[];
  };
  scheduling?: {
    releaseDate?: Date;
    expireDate?: Date;
  };
};

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  COUPLE = "couple",
  OTHER = "other",
}

export enum GenderPronoun {
  HE = "he",
  SHE = "she",
  THEY = "they",
  OTHER = "other",
}

export type PostMedia = {
  creationDate: string;
  id: number;
  isActive: boolean;
  mediaUrl: string;
  order: number;
  postId: number;
  type: number; // 0: image, 1: video, 2: audio
};

export type Post = {
  commentCount: number;
  creationDate: string;
  id: number;
  isActive: boolean;
  isNsfw: boolean;
  isPinned: boolean;
  isScheduled: boolean;
  likeCount: number;
  mediaType: number;
  postComments: any[]; 
  postMedia?: PostMedia[]; 
  postTags: any[]; 
  price: number;
  tipCount: number;
  title: string;
  type: number;
  userDisplayName: string;
  userId: number;
  userName: string;
  viewCount: number;
  visibility: number;
  currentUserLiked: boolean;
};

export type UserFollow = {
};

export type UserShort = {
  id: number;
  userName: string;
  displayName: string;
  profilePictureUrl: string;
  isFollowed: boolean;
};

export type Follower = {
  id: number;
  followerId: number;
  followedId: number;
  creationDate: string;
  isActive: boolean;
  follower?: UserShort;
};

export type Followed = {
  id: number;
  followerId: number;
  followedId: number;
  creationDate: string;
  isActive: boolean;
  followed?: UserShort;
};