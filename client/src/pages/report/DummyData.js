// Dummy data mimicking an app store API response
export const appData = {
  id: "discord-app-001",
  appName: "Discord",
  company: "Discord Inc.",
  description: "Chat, hang out, and stay close with your friends and communities.",
  logo: "https://logodownload.org/wp-content/uploads/2017/11/discord-logo-1.png",
  category: "Social",
  price: "Free",
  ratingsCount: "3.4M",
  ratingAverage: 4.7,
  reviews: [
    {
      id: 1,
      author: "User123",
      rating: 5,
      title: "Amazing communication app!",
      content: "Best app for staying connected with friends and gaming communities.",
      date: "2024-04-15"
    },
    {
      id: 2,
      author: "GamerPro",
      rating: 4,
      title: "Great features, minor issues",
      content: "Love the voice quality, but sometimes has connection problems.",
      date: "2024-04-10"
    },
    {
      id: 3,
      author: "CasualUser",
      rating: 5,
      title: "Perfect for communities",
      content: "Excellent for organizing group chats and servers.",
      date: "2024-04-05"
    },
    {
      id: 4,
      author: "TechEnthusiast",
      rating: 4,
      title: "Good app, could be better",
      content: "Functional and user-friendly, but lacks some advanced features.",
      date: "2024-04-01"
    },
    {
      id: 5,
      author: "StreamerLife",
      rating: 5,
      title: "My go-to for streaming",
      content: "Makes coordinating streams with friends super easy.",
      date: "2024-03-28"
    }
  ],
  downloads: "500M+",
  releaseDate: "2015-05-13",
  currentVersion: "263.0",
  minimumOS: "iOS 12.0 / Android 5.0+",
  publisher: "Discord Inc.",
  privacy: "https://discord.com/privacy",
  terms: "https://discord.com/terms"
};

// Multiple apps for testing
export const appsList = [
  appData,

  // SPOTIFY
  {
    id: "spotify-app-002",
    appName: "Spotify",
    company: "Spotify AB",
    description: "Stream your favorite music and podcasts.",
    logo: "https://cdn-icons-png.flaticon.com/512/174/174872.png",
    category: "Music",
    price: "Free (Premium: $12.99/month)",
    ratingsCount: "40M",
    ratingAverage: 4.8,
    downloads: "500M+",
    currentVersion: "8.9.12",
    reviews: [
      {
        id: 1,
        author: "MusicLover",
        rating: 5,
        title: "Best music app ever",
        content: "The recommendations are insanely accurate. I discover new songs daily.",
        date: "2024-04-12"
      },
      {
        id: 2,
        author: "PodcastFan",
        rating: 4,
        title: "Great for podcasts",
        content: "Love the podcast selection, but the UI could be a bit cleaner.",
        date: "2024-04-08"
      },
      {
        id: 3,
        author: "Audiophile",
        rating: 5,
        title: "Premium is worth it",
        content: "The sound quality and offline mode make Premium a must-have.",
        date: "2024-04-03"
      },
      {
        id: 4,
        author: "DailyDriver",
        rating: 5,
        title: "Use it every day",
        content: "My daily commute would be boring without Spotify.",
        date: "2024-03-29"
      },
      {
        id: 5,
        author: "ShuffleHater",
        rating: 3,
        title: "Shuffle needs improvement",
        content: "Great app overall, but shuffle feels repetitive sometimes.",
        date: "2024-03-25"
      }
    ]
  },

  // NETFLIX
  {
    id: "netflix-app-003",
    appName: "Netflix",
    company: "Netflix Inc.",
    description: "Watch movies, TV shows, and more.",
    logo: "https://cdn-icons-png.flaticon.com/512/732/732228.png",
    category: "Entertainment",
    price: "Premium: $6.99/month",
    ratingsCount: "6.3M",
    ratingAverage: 4.7,
    downloads: "1B+",
    currentVersion: "8.8.0",
    reviews: [
      {
        id: 1,
        author: "BingeWatcher",
        rating: 5,
        title: "Perfect for weekends",
        content: "So many shows to binge. The new releases are fire.",
        date: "2024-04-14"
      },
      {
        id: 2,
        author: "MovieBuff",
        rating: 4,
        title: "Great selection",
        content: "Lots of great movies, but some classics are missing.",
        date: "2024-04-09"
      },
      {
        id: 3,
        author: "FamilyTime",
        rating: 5,
        title: "Great for family nights",
        content: "Tons of kid-friendly content and family movies.",
        date: "2024-04-06"
      },
      {
        id: 4,
        author: "CriticMode",
        rating: 3,
        title: "UI could be better",
        content: "Content is great but the interface feels cluttered.",
        date: "2024-04-02"
      },
      {
        id: 5,
        author: "SeriesAddict",
        rating: 5,
        title: "Amazing originals",
        content: "Netflix originals are top-tier. Worth the subscription.",
        date: "2024-03-30"
      }
    ]
  }
];


export let savedApps = [
  {
    appId: "101",
    appName: "Nova Task Manager",
    trackId: "track-101",
    developerName: "Lumina Softworks",
    iconUrl: "", // Using placeholder images for testing
    genre: "Productivity",
    averageRating: 4.8,
    ratingCount: 125400, // Will test your "125K" logic
    reviews: [
      { id: 1, author: "Alex D.", content: "The best task flow I've used.", rating: 5 },
      { id: 2, author: "Jordan K.", content: "Solid, but needs a dark mode.", rating: 4 }
    ]
  },
  {
    appId: "205",
    appName: "Ash App",
    trackId: "track-205",
    developerName: "Capital Logic",
    iconUrl: "",
    genre: "Finance",
    averageRating: 4.2,
    ratingCount: 8900, // Will test your "8.9K" logic
    reviews: [
      { id: 1, author: "Sarah P.", content: "Clean charts, very professional.", rating: 4 },
      { id: 2, author: "Mike W.", content: "Syncing takes a few seconds.", rating: 3 }
    ]
  },
  {
    appId: "309",
    appName: "Velo Health",
    trackId: "track-309",
    developerName: "BioTrack Systems",
    iconUrl: "",
    genre: "Health & Fitness",
    averageRating: 3.9,
    ratingCount: 1040500, // Will test your "1M" logic
    reviews: [
      { id: 1, author: "Chris T.", content: "Great for tracking runs.", rating: 5 },
      { id: 2, author: "Elena R.", content: "A bit heavy on the battery.", rating: 2 }
    ]
  },
  {
    appId: "405",
    appName: "Zeniitor",
    trackId: "track-405",
    developerName: "PixelArt Labs",
    iconUrl: "",
    genre: "Photography",
    averageRating: 4.5,
    ratingCount: 450, // Tests the logic when under 1K
    reviews: [
      { id: 1, author: "Tom H.", content: "The filters are high quality.", rating: 5 }
    ]
  },
  {
    appId: "505",
    appName: "ZeEditor",
    trackId: "track-505",
    developerName: "PixelArt Labs",
    iconUrl: "",
    genre: "Photography",
    averageRating: 4.5,
    ratingCount: 450, // Tests the logic when under 1K
    reviews: [
      { id: 1, author: "Tom H.", content: "The filters are high quality.", rating: 5 }
    ]
  },
  {
    appId: "606",
    appName: "Zeniitor",
    trackId: "track-606",
    developerName: "PixelArt Labs",
    iconUrl: "",
    genre: "Photography",
    averageRating: 4.5,
    ratingCount: 450, // Tests the logic when under 1K
    reviews: [
      { id: 1, author: "Tom H.", content: "The filters are high quality.", rating: 5 }
    ]
  },
  {
    appId: "707",
    appName: "Zeniditor",
    trackId: "track-707",
    developerName: "PixeLabs",
    iconUrl: "",
    genre: "Photography",
    averageRating: 4.5,
    ratingCount: 450, // Tests the logic when under 1K
    reviews: [
      { id: 1, author: "Tom H.", content: "The filters are high quality.", rating: 5 }
    ]
  },
  {
    appId: "808",
    appName: "Ashly app last",
    trackId: "track-808",
    developerName: "PixeLabs",
    iconUrl: "",
    genre: "Photography",
    averageRating: 4.5,
    ratingCount: 450, // Tests the logic when under 1K
    reviews: [
      { id: 1, author: "Tom H.", content: "The filters are high quality.", rating: 5 }
    ]
  }
];

export const positiveInsights = [
    { label: 'UI/UX', text: 'Highly intuitive navigation flow optimized for React-Vite.' },
    { label: 'Runtime', text: 'Efficient memory allocation during large dataset renders.' },
    { label: 'Aesthetic', text: 'Glassmorphism implementation adds professional depth.' }
  ];

export const negativeInsights = [
    { label: 'Latency', text: 'Potential fetch delays identified in the backend migrations.' },
    { label: 'Memory', text: 'High overhead detected when scaling complex data structures.' },
    { label: 'DevOps', text: 'Unused dependencies found in the current Vite skeleton.' }
  ];
  
export default appData;