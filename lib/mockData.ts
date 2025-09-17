import { pageUrls } from "./enums/page-urls";

export const heroFeatures = [
  {
    image: "/assets/svgs/home-scene-1.svg",
    title: "HomePage.features.paywallNetwork.title",
    description:
      "HomePage.features.paywallNetwork.description"
  },
  {
    image: "/assets/svgs/home-scene-2.svg",
    title: "HomePage.features.forFansAndCreators.title",
    description:
    "HomePage.features.forFansAndCreators.description",
  },
  {
    image: "/assets/svgs/home-scene-3.svg",
    title: "HomePage.features.qualityContent.title",
    description:
     "HomePage.features.qualityContent.description",
  },
];

export const featuresData = [
  {
    icon: "paywall",
    title: "HomePage.mainFeatures.titles.advancedPaywall",
    description: "HomePage.mainFeatures.list.advancedPaywall",
  },
  {
    icon: "tools",
    title: "HomePage.mainFeatures.titles.advancedPosting",
    description: "HomePage.mainFeatures.list.advancedPosting",
  },
  {
    icon: "messenger",
    title: "HomePage.mainFeatures.titles.liveMessenger",
    description: "HomePage.mainFeatures.list.liveMessenger",
  },
  {
    icon: "mobilite",
    title: "HomePage.mainFeatures.titles.mobileReady",
    description: "HomePage.mainFeatures.list.mobileReady",
  },
  {
    icon: "theme",
    title: "HomePage.mainFeatures.titles.themes",
    description: "HomePage.mainFeatures.list.themes",
  },
  {
    icon: "language",
    title: "HomePage.mainFeatures.titles.localization",
    description: "HomePage.mainFeatures.list.localization",
  },
  {
    icon: "save",
    title: "HomePage.mainFeatures.titles.bookmarks",
    description: "HomePage.mainFeatures.list.bookmarks",
  },
  {
    icon: "flag",
    title: "HomePage.mainFeatures.titles.reporting",
    description: "HomePage.mainFeatures.list.reporting",
  },
  {
    icon: "liveStreaming",
    title: "HomePage.mainFeatures.titles.liveStreaming",
    description: "HomePage.mainFeatures.list.liveStreaming",
  },
];


export const featuredCreators = [
  {
    name: "John Doe",
    image: "/assets/images/featured-1.jpg",
    background: "/assets/images/featured-bg-1.jpg",
    username: "johndoe",
  },
  {
    name: "Jane Doe",
    image: "/assets/images/featured-2.jpg",
    background: "/assets/images/featured-bg-2.jpg",
    username: "janedoe",
  },
  {
    name: "Jane Doe",
    image: "/assets/images/featured-1.jpg",
    background: "/assets/images/featured-bg-1.jpg",
    username: "janedoe",
  },
];


export const sidebarLinks = [
  {
    label: 'sidebar.home',
    href: pageUrls.FEED,
    icon: "home",
  },
  {
    label: 'sidebar.notifications',
    href: pageUrls.NOTIFICATIONS,
    icon: "notifications",
  },
  {
    label: 'sidebar.messages',
    href: pageUrls.MESSAGES,
    icon: "messages",
    badgeCount: 10,
  },
  {
    label: 'sidebar.myProfile',
    href: "/profile",
    icon: "profile",
  },
];

export const feedPosts = [
  {
    id: "post1",
    user: {
      name: "rachel",
      username: "raechel-zane",
      avatar: "https://i.pravatar.cc/150?u=rachel",
    },
    createdAt: "2024-07-23T10:00:00Z",
    content: "Like?",
    media: [
      {
        type: "image" as const,
        url: "https://dplwsh2tkj4da.cloudfront.net/posts/images/8bd84f0324994f8abc777be55a75f918.jpg",
      },
      {
        type: "image" as const,
        url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      },
    ],
    poll: {
      options: [
        { text: "Yes", votes: 1, percentage: 100 },
        { text: "No", votes: 0, percentage: 0 },
      ],
      totalVotes: 1,
    },
    likes: 0,
    likedByMe: false,
    comments: [],
    tips: 0,
    isPPV: false,
  },
  {
    id: "post2",
    user: {
      name: "rachel",
      username: "raechel-zane",
      avatar: "https://i.pravatar.cc/150?u=rachel",
    },
    createdAt: "2024-07-23T09:00:00Z",
    content: "Hello????????",
    media: [],
    poll: {
      options: [
        { text: "Yes", votes: 1, percentage: 100 },
        { text: "No", votes: 0, percentage: 0 },
      ],
      totalVotes: 1,
    },
    likes: 15,
    likedByMe: true,
    comments: [],
    tips: 1,
    isPPV: false,
  },
  {
    id: "1",
    user: {
      name: "Shashank Test",
      username: "u1746601307",
      avatar: "/assets/images/featured-1.jpg",
    },
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    content: "A beautiful night sky over the desert.",
    createdAt: "2025-06-19T12:00:00Z",
    isPPV: true,
    likes: 1,
    likedByMe: false,
    comments: [
      {
        id: "c1",
        user: {
          name: "raechel-zane",
          username: "raechel-zane",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        content: "@raechel-zane @raechel-zane @raechel-zane",
        createdAt: "2023-05-01T09:15:00Z",
        likes: 0,
        likedByMe: false,
      },
      {
        id: "c2",
        user: {
          name: "raechel-zane",
          username: "raechel-zane",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        content: "nice",
        createdAt: "2025-05-01T18:50:00Z",
        likes: 0,
        likedByMe: false,
      },
      {
        id: "c3",
        user: {
          name: "raechel-zane",
          username: "raechel-zane",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        content: "Nice",
        createdAt: "2023-05-01T01:41:00Z",
        likes: 0,
        likedByMe: false,
      },
    ],
    tips: 5,
  },
  {
    id: "2",
    user: {
      name: "Jane Doe",
      username: "janedoe",
      avatar: "/assets/images/featured-2.jpg",
    },
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    content: "Sunset at the beach!",
    createdAt: "2023-05-02T15:30:00Z",
    isPPV: false,
    likes: 3,
    likedByMe: true,
    comments: [],
    tips: 2,
  },
];

export const suggestions = [
  {
    name: "NorwegianNerd",
    username: "NorwegianNerd",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Fiona Mary",
    username: "fionamary",
    avatar: "https://randomuser.me/api/portraits/women/66.jpg",
    bg: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Judith",
    username: "u1665637444",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg",
    bg: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
  },
];

export const userPostTabs = [
  { label: "posts", count: 0 },
  // { label: "story", count: 0 },
  // { label: "reels", count: 0 },
  // { label: "scorp", count: 0 },
];

export const notifications = [
  {
    id: 1,
    title: "Notification",
    message:
      "Your live streaming is about to end in 30 minutes. You can start another one afterwards.",
    time: "1 hour ago",
  },
  {
    id: 2,
    title: "Notification",
    message:
      "Your live streaming is about to end in 30 minutes. You can start another one afterwards.",
    time: "16 hours ago",
  },
  {
    id: 3,
    title: "Notification",
    message:
      "Your live streaming is about to end in 30 minutes. You can start another one afterwards.",
    time: "18 hours ago",
  },
  {
    id: 4,
    title: "Notification",
    message:
      "Your live streaming is about to end in 30 minutes. You can start another one afterwards.",
    time: "1 day ago",
  },
  {
    id: 5,
    title: "Notification",
    message:
      "Your live streaming is about to end in 30 minutes. You can start another one afterwards.",
    time: "1 day ago",
  },
  {
    id: 6,
    title: "Notification",
    message:
      "Your live streaming is about to end in 30 minutes. You can start another one afterwards.",
    time: "1 day ago",
  },
];

export const messageNotifications = [
  {
    id: 1,
    name: "Shashank Test",
    avatar: "/assets/images/featured-1.jpg",
    message: "hi",
    time: "1 month ago",
  },
  {
    id: 2,
    name: "Kursty",
    avatar: "/assets/images/featured-2.jpg",
    message: "Sorry",
    time: "2 months ago",
  },
  {
    id: 3,
    name: "TES56",
    avatar: "",
    message: "ytht",
    time: "3 months ago",
  },
  {
    id: 4,
    name: "TES56",
    avatar: "",
    message: "fdfdgrtgfgef",
    time: "3 months ago",
  },
  {
    id: 5,
    name: "TES56",
    avatar: "",
    message: "i dont want pay",
    time: "3 months ago",
  },
  {
    id: 6,
    name: "TES56",
    avatar: "",
    message: "hello",
    time: "3 months ago",
  },
];

export const likesNotifications = [
  {
    id: 1,
    name: "Naomi",
    avatar: "/assets/images/featured-2.jpg",
    message: "rachel liked your comment.",
    time: "8 months ago",
  },
  {
    id: 2,
    name: "Samatha",
    avatar: "/assets/images/featured-1.jpg",
    message: "rachel liked your comment.",
    time: "8 months ago",
  },
  {
    id: 3,
    name: "Sam Jan",
    avatar: "",
    message: "Sam Jan liked your post.",
    time: "10 months ago",
  },
];

export const subscriptionsNotifications = [
  {
    id: 1,
    name: "yryhy",
    avatar: "",
    message: "A new user subscribed to your profile.",
    time: "2 weeks ago",
  },
  {
    id: 2,
    name: "Shashank Test",
    avatar: "/assets/images/featured-1.jpg",
    message: "A new user subscribed to your profile.",
    time: "1 month ago",
  },
  {
    id: 3,
    name: "nicolas",
    avatar: "",
    message: "A new user subscribed to your profile.",
    time: "4 months ago",
  },
];

export const tipsNotifications = [
  {
    id: 1,
    name: "Shashank Test",
    avatar: "/assets/images/featured-1.jpg",
    message: "Someone unlocked your post.",
    time: "1 week ago",
  },
  {
    id: 2,
    name: "Shashank Test",
    avatar: "/assets/images/featured-1.jpg",
    message: "Someone unlocked your message.",
    time: "4 weeks ago",
  },
];

export const settingsSidebarLinks = [
  {
    label: 'userSettings.list.titles.profile',
    href: pageUrls.SETTINGS.PROFILE,
    icon: "profileSettings",
  },
  {
    label: 'userSettings.list.titles.account',
    href: pageUrls.SETTINGS.ACCOUNT,
    icon: "settings",
  },
  {
    label: 'userSettings.list.titles.wallet',
    href: pageUrls.SETTINGS.WALLET,
    icon: "wallet",
  },
  // {
  //   label: 'userSettings.list.titles.payments',
  //   href: pageUrls.SETTINGS.PAYMENTS,
  //   icon: "payments",
  // },
  // {
  //   label: 'userSettings.list.titles.rates',
  //   href: pageUrls.SETTINGS.RATES,
  //   icon: "rates",
  // },
  {
    label: 'userSettings.list.titles.subscriptions',
    href: pageUrls.SETTINGS.SUBSCRIPTIONS,
    icon: "subscriptionsSettings",
  },
  // {
  //   label: 'userSettings.list.titles.referrals',
  //   href: pageUrls.SETTINGS.REFERRALS,
  //   icon: "referrals",
  // },
  // {
  //   label: 'userSettings.list.titles.notifications',
  //   href: pageUrls.SETTINGS.NOTIFICATIONS,
  //   icon: "notificationsSettings",
  // },
  // {
  //   label: 'userSettings.list.titles.privacy',
  //   href: pageUrls.SETTINGS.PRIVACY,
  //   icon: "privacy",
  // },
  // {
  //   label: 'userSettings.list.titles.verify',
  //   href: pageUrls.SETTINGS.VERIFY,
  //   icon: "verify",
  // },
];

export const mockUsersChat = [
  {
    id: "1",
    name: "Alice Smith",
    username: "alice_smith",
    avatar: "https://i.pravatar.cc/150?img=1",
    online: true,
  },
  {
    id: "2", 
    name: "Michael Brown",
    username: "michael_brown",
    avatar: "https://i.pravatar.cc/150?img=2",
    online: false,
  },
  {
    id: "3",
    name: "Sophia Lee",
    username: "sophia_lee", 
    avatar: "https://i.pravatar.cc/150?img=3",
    online: true,
  },
  {
    id: "4",
    name: "James Wilson",
    username: "james_wilson",
    avatar: "https://i.pravatar.cc/150?img=4", 
    online: false,
  },
  {
    id: "5",
    name: "Emma Johnson",
    username: "emma_johnson",
    avatar: "https://i.pravatar.cc/150?img=5",
    online: true,
  },
  {
    id: "6",
    name: "David Garcia",
    username: "david_garcia",
    avatar: "https://i.pravatar.cc/150?img=6",
    online: false,
  },
  {
    id: "7",
    name: "Olivia Martinez",
    username: "olivia_martinez",
    avatar: "https://i.pravatar.cc/150?img=7",
    online: true,
  },
  {
    id: "8",
    name: "William Taylor",
    username: "william_taylor",
    avatar: "https://i.pravatar.cc/150?img=8",
    online: false,
  },
];

export const initialLists = [
  {
    key: "following",
    title: "Following",
    people: 81,
    posts: 123,
    avatars: [
      "/assets/images/featured-1.jpg",
      "/assets/images/featured-2.jpg",
      "https://randomuser.me/api/portraits/women/65.jpg",
    ],
  },
  {
    key: "followers",
    title: "Followers",
    people: 44,
    posts: 49,
    avatars: [
      "https://randomuser.me/api/portraits/women/66.jpg",
      "https://randomuser.me/api/portraits/women/67.jpg",
      "/assets/images/featured-2.jpg",
    ],
  },
  {
    key: "blocked",
    title: "Blocked",
    people: 0,
    posts: 0,
    avatars: [],
  },
];

export const bookmarkPosts = [
  {
    id: "bm1",
    user: {
      name: "Audio User",
      username: "audiouser",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    createdAt: "2024-07-23T10:00:00Z",
    content: "Dinle!",
    media: [
      {
        type: "audio",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      },
    ],
    likes: 2,
    likedByMe: false,
    comments: [],
    tips: 0,
    isPPV: false,
  },
  {
    id: "bm2",
    user: {
      name: "Video User",
      username: "videouser",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    createdAt: "2024-07-22T09:00:00Z",
    content: "Bir video paylaşımı!",
    media: [
      {
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    ],
    likes: 5,
    likedByMe: true,
    comments: [],
    tips: 1,
    isPPV: false,
  },
  {
    id: "bm3",
    user: {
      name: "Image User",
      username: "imageuser",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    createdAt: "2024-07-21T08:00:00Z",
    content: "Tek bir resim!",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      },
    ],
    likes: 3,
    likedByMe: false,
    comments: [],
    tips: 0,
    isPPV: false,
  },
  {
    id: "bm4",
    user: {
      name: "Multi Image User",
      username: "multiimageuser",
      avatar: "https://randomuser.me/api/portraits/women/47.jpg",
    },
    createdAt: "2024-07-20T07:00:00Z",
    content: "Birden fazla resim!",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      },
    ],
    likes: 7,
    likedByMe: true,
    comments: [],
    tips: 2,
    isPPV: false,
  },
  {
    id: "bm5",
    user: {
      name: "Text User",
      username: "textuser",
      avatar: "https://randomuser.me/api/portraits/men/48.jpg",
    },
    createdAt: "2024-07-19T06:00:00Z",
    content: "Sadece metin içeren bir gönderi.",
    media: [],
    likes: 1,
    likedByMe: false,
    comments: [],
    tips: 0,
    isPPV: false,
  },
];

export const liveStreams = [
  {
    id: "stream1",
    title: "Neon rider | Ask me anything",
    description: "Started streaming 3yrs ago",
    startedAt: new Date(Date.now() - 3 * 365 * 24 * 60 * 60 * 1000).toISOString(),
    user: {
      username: "sir.code.alot",
      displayName: "@sir.code.alot",
    },
    isFree: true,
    thumbnail: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    viewers: 120,
  },
  {
    id: "stream2",
    title: "Cooking with Emma | Q&A",
    description: "Started streaming 2yrs ago",
    startedAt: new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000).toISOString(),
    user: {
      username: "emma.cooks",
      displayName: "@emma.cooks",
    },
    isFree: false,
    thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
    viewers: 85,
  },
  {
    id: "stream3",
    title: "GamerZone | Live Gameplay",
    description: "Started streaming 1yr ago",
    startedAt: new Date(Date.now() - 1 * 365 * 24 * 60 * 60 * 1000).toISOString(),
    user: {
      username: "gamerzone",
      displayName: "@gamerzone",
    },
    isFree: true,
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80",
    viewers: 200,
  },
];

export const peopleList = [
  {
    id: "u1",
    name: "Kerem",
    username: "u1751023573",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    description: "No description available.",
  },
  {
    id: "u2",
    name: "Zen",
    username: "u1751019186",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    description: "No description available.",
  },
  {
    id: "u3",
    name: "Rajata",
    username: "u1751018746",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    description: "No description available.",
  },
  {
    id: "u4",
    name: "EesyFqexZ",
    username: "u1750937499",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    description: "No description available.",
  },
  {
    id: "u5",
    name: "Lina",
    username: "u1750937498",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    description: "No description available.",
  },
  {
    id: "u6",
    name: "Ahmet",
    username: "u1750937497",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    description: "No description available.",
  },
  {
    id: "u7",
    name: "Sena",
    username: "u1750937496",
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    description: "No description available.",
  },
  {
    id: "u8",
    name: "Alex",
    username: "u1750937495",
    avatar: "https://randomuser.me/api/portraits/men/8.jpg",
    description: "No description available.",
  },
  {
    id: "u9",
    name: "Elif",
    username: "u1750937494",
    avatar: "https://randomuser.me/api/portraits/women/9.jpg",
    description: "No description available.",
  },
  {
    id: "u10",
    name: "Can",
    username: "u1750937493",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    description: "No description available.",
  },
];