interface Post {
  id: number;
  user: string;
  time: string;
  content: string;
  likes: number;
  comments: string[];
  shares: number;
  sentiment?: 'bullish' | 'bearish';
  media?: { type: 'photo' | 'video' | 'stock'; url: string };
}

let posts: Post[] = [
  { id: 0, user: 'TraderX', time: '2h ago', content: 'Bullish on $AAPL after earnings!', likes: 0, comments: [], shares: 0, sentiment: 'bullish' },
  { id: 1, user: 'StockGuru', time: '5h ago', content: '$TSLA dropping—oversold?', likes: 0, comments: [], shares: 0, sentiment: 'bearish' },
];

export const fetchPosts = async (page: number, limit: number): Promise<Post[]> => {
  const start = page * limit;
  return new Promise((resolve) => setTimeout(() => resolve(posts.slice(0, start + limit)), 500));
};

export const addPost = async (post: Post): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      posts = [post, ...posts];
      resolve();
    }, 500);
  });
};