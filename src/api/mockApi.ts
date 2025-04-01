interface Post {
  user: string;
  time: string;
  content: string;
  likes: number;
  comments: string[];
}

let posts: Post[] = [
  { user: 'TraderX', time: '2h ago', content: 'Bullish on $AAPL after earnings!', likes: 0, comments: [] },
  { user: 'StockGuru', time: '5h ago', content: '$TSLA dropping—oversold?', likes: 0, comments: [] },
  { user: 'MarketMogul', time: '1d ago', content: '$GOOG breaking out!', likes: 0, comments: [] },
];

export const fetchPosts = async (page: number, limit: number): Promise<Post[]> => {
  const start = page * limit;
  return new Promise((resolve) => {
    setTimeout(() => resolve(posts.slice(0, start + limit)), 500);
  });
};

export const addPost = async (post: Post): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      posts = [post, ...posts];
      resolve();
    }, 500);
  });
};