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
  const generatedPosts: Post[] = [];
  for (let i = 0; i < limit; i++) {
    const id = page * limit + i;
    const post: Post = {
      id,
      user: `User${id}`,
      time: `${i + 1}h ago`,
      content: `This is a sample post about $AAPL #trading`,
      likes: Math.floor(Math.random() * 100),
      comments: [],
      shares: 0,
    };

    // Add some variation to the posts
    if (id % 2 === 0) {
      post.sentiment = Math.random() > 0.5 ? 'bullish' : 'bearish';
    }
    if (id % 3 === 0) {
      post.media = {
        type: Math.random() > 0.5 ? 'photo' : 'video',
        url: 'https://via.placeholder.com/300',
      };
    }
    if (id % 5 === 0) {
      post.priceUpdate = {
        symbol: 'AAPL',
        price: 150 + Math.random() * 10,
        change: (Math.random() - 0.5) * 5,
        type: 'stock',
      };
    }

    generatedPosts.push(post);
  }
  return generatedPosts;
};

export const addPost = async (post: Post): Promise<void> => {
  posts.unshift(post);
};