interface NewsItem {
  title: string;
  source: string;
  url: string;
  ticker: string;
}

const mockNews: NewsItem[] = [
  { title: 'Apple Beats Q1 Estimates', source: 'Benzinga', url: 'https://benzinga.com', ticker: 'AAPL' },
  { title: 'Tesla Recalls 1M Vehicles', source: 'MarketWatch', url: 'https://marketwatch.com', ticker: 'TSLA' },
  { title: 'Google AI Push Boosts Shares', source: 'CNBC', url: 'https://cnbc.com', ticker: 'GOOG' },
];

export const fetchNews = async (ticker: string): Promise<NewsItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockNews.filter((n) => n.ticker === ticker)), 500);
  });
};
