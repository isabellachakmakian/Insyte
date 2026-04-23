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
    currentVersion: "8.9.12"
  },
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
    currentVersion: "8.8.0"
  }
];

export default appData;
