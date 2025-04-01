interface Post {
  user: string;
  time: string;
  content: string;
  likes: number;
  comments: string[];
  sentiment?: 'bullish' | 'bearish';
}

let posts: Post[] = [
  { user: 'TraderX', time: '2h ago', content: 'Bullish on $AAPL after earnings!', likes: 0, comments: [], sentiment: 'bullish' },
  { user: 'StockGuru', time: '5h ago', content: '$TSLA dropping—oversold?', likes: 0, comments: [], sentiment: 'bearish' },
];

// Simulate fetching posts with a delay
export const fetchPosts = async (start: number, limit: number): Promise<Post[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(posts.slice(start, start + limit));
    }, 1000); // Simulate 1-second delay
  });
};