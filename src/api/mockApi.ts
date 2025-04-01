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
  nft?: { name: string; image: string; details: { trait: string; value: string }[] };
  priceUpdate?: { symbol: string; price: number; change: number; type: 'stock' | 'crypto' };
  tradeSettings?: { stopLoss: number; takeProfit: number; trailingStop: boolean };
}

let posts: Post[] = [
  {
    id: 1,
    user: 'TraderX',
    time: '2h ago',
    content: 'Going long on $AAPL, looks bullish!',
    likes: 10,
    comments: ['Great call!', 'I’m in too!'],
    shares: 2,
  },
  {
    id: 2,
    user: 'StockGuru',
    time: '3h ago',
    content: 'Bearish on $TSLA, overbought IMO.',
    likes: 8,
    comments: ['Interesting take!'],
    shares: 1,
  },
];

export const fetchPosts = (page: number, limit: number): Post[] => {
  const start = page * limit;
  const end = start + limit;
  return posts.slice(start, end);
};

export const addPost = async (post: Post): Promise<void> => {
  posts.unshift(post);
};