import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Routes, Route, Link } from 'react-router-dom';
import { darkTheme } from './theme';
import Toolbar from './components/Toolbar';
import Feed from './components/Feed';
import Profile from './components/Profile';
import NewsTab from './components/NewsTab';
import SentimentBar from './components/SentimentBar';
import StockScreener from './components/StockScreener';
import NimbusAI from './components/NimbusAI';
import StopLoss from './components/StopLoss';
import LiveChat from './components/LiveChat';
import LiveVideo from './components/LiveVideo';
import PortfolioTracker from './components/PortfolioTracker';
import Notifications from './components/Notifications';
import Analytics from './components/Analytics';
import StockPrices from './components/StockPrices';
import ActivityFeed from './components/ActivityFeed';
import WalletConnect from './components/WalletConnect';
import NFTMarketplace from './components/NFTMarketplace';
import { Feed as FeedIcon, Activity as ActivityIcon, AccountBalanceWallet, Store } from '@mui/icons-material';
import './App.css';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const handleLogin = (username: string) => {
    setIsAuthenticated(true);
    setUsername(username);
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername(null);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Toolbar
        isDarkMode={true}
        toggleTheme={() => {}}
        isAuthenticated={isAuthenticated}
        username={username}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      <main>
        <div className="sidebar">
          <Link to="/" title="Feed">
            <FeedIcon />
          </Link>
          <Link to="/activity" title="Activity">
            <ActivityIcon />
          </Link>
          <Link to="/wallet" title="Wallet">
            <AccountBalanceWallet />
          </Link>
          <Link to="/nft-marketplace" title="NFT Marketplace">
            <Store />
          </Link>
        </div>
        <div className="content">
          <SentimentBar />
          <Routes>
            <Route path="/" element={<Feed username={username} />} />
            <Route path="/profile" element={<Profile trades={200} followers={500} bio="Swing trader since 2015." />} />
            <Route path="/news" element={<NewsTab />} />
            <Route path="/screener" element={<StockScreener />} />
            <Route path="/nimbus" element={<NimbusAI />} />
            <Route path="/stoploss" element={<StopLoss />} />
            <Route path="/chat" element={<LiveChat username={username} />} />
            <Route path="/video" element={<LiveVideo />} />
            <Route path="/portfolio" element={<PortfolioTracker />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/prices" element={<StockPrices />} />
            <Route path="/activity" element={<ActivityFeed />} />
            <Route path="/wallet" element={<WalletConnect />} />
            <Route path="/nft-marketplace" element={<NFTMarketplace />} />
          </Routes>
        </div>
      </main>
    </ThemeProvider>
  );
};

export default App;