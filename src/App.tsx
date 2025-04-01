import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Routes, Route, Link } from 'react-router-dom';
import { darkTheme, lightTheme } from './theme';
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
import DecentralizedIdentity from './components/DecentralizedIdentity';
import CryptoTransactionHistory from './components/CryptoTransactionHistory';
import DecentralizedStorage from './components/DecentralizedStorage';
import VerifiableCredentials from './components/VerifiableCredentials';
import Backtest from './components/Backtest';
import MobileCompanion from './components/MobileCompanion';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Settings from './components/Settings';
import About from './components/About';
import Legal from './components/Legal';
import Terms from './components/Terms';
import Footer from './components/Footer';
import Explore from './components/Explore';
import Games from './components/Games';
import StockDetails from './components/StockDetails';
import ProfileCustomization from './components/ProfileCustomization';
import Alerts from './components/Alerts';
import EducationHub from './components/EducationHub';
import TradeIdeas from './components/TradeIdeas';
import EarningsCalendar from './components/EarningsCalendar';
import MarketMovers from './components/MarketMovers';
import TradeSimulator from './components/TradeSimulator';
import {
  Feed as FeedIcon,
  Timeline as ActivityIcon,
  AccountBalanceWallet,
  Store,
  BarChart,
  Assessment,
  VerifiedUser,
  History,
  Cloud,
  Lock,
  Explore as ExploreIcon,
  Games as GamesIcon,
  Login as LoginIcon,
  Notifications as AlertsIcon,
  School as EducationIcon,
  Lightbulb as IdeasIcon,
  Event as CalendarIcon,
  TrendingUp as MoversIcon,
  Simulate as SimulatorIcon,
} from '@mui/icons-material';
import './App.css';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleLogin = (username: string) => {
    setIsAuthenticated(true);
    setUsername(username);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername(null);
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Toolbar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
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
          <Link to="/explore" title="Explore">
            <ExploreIcon />
          </Link>
          <Link to="/games" title="Games">
            <GamesIcon />
          </Link>
          <Link to="/screener" title="Stock Screener">
            <BarChart />
          </Link>
          <Link to="/portfolio" title="Portfolio Analytics">
            <Assessment />
          </Link>
          <Link to="/alerts" title="Alerts">
            <AlertsIcon />
          </Link>
          <Link to="/education" title="Education Hub">
            <EducationIcon />
          </Link>
          <Link to="/trade-ideas" title="Trade Ideas">
            <IdeasIcon />
          </Link>
          <Link to="/earnings" title="Earnings Calendar">
            <CalendarIcon />
          </Link>
          <Link to="/movers" title="Market Movers">
            <MoversIcon />
          </Link>
          <Link to="/simulator" title="Trade Simulator">
            <SimulatorIcon />
          </Link>
          <Link to="/wallet" title="Wallet">
            <AccountBalanceWallet />
          </Link>
          <Link to="/nft-marketplace" title="NFT Marketplace">
            <Store />
          </Link>
          <Link to="/identity" title="Decentralized Identity">
            <VerifiedUser />
          </Link>
          <Link to="/transactions" title="Transaction History">
            <History />
          </Link>
          <Link to="/storage" title="Decentralized Storage">
            <Cloud />
          </Link>
          <Link to="/credentials" title="Verifiable Credentials">
            <Lock />
          </Link>
          {!isAuthenticated && (
            <Link to="/login" title="Login">
              <LoginIcon />
            </Link>
          )}
        </div>
        <div className="content">
          <MobileCompanion onToggle={setIsMobileView} />
          <SentimentBar />
          <Routes>
            <Route path="/" element={<Feed username={username} />} />
            <Route path="/profile" element={<Profile trades={200} followers={500} bio="Swing trader since 2015." />} />
            <Route path="/profile/customize" element={<ProfileCustomization />} />
            <Route path="/news" element={<NewsTab />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/games" element={<Games />} />
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
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/education" element={<EducationHub />} />
            <Route path="/trade-ideas" element={<TradeIdeas />} />
            <Route path="/earnings" element={<EarningsCalendar />} />
            <Route path="/movers" element={<MarketMovers />} />
            <Route path="/simulator" element={<TradeSimulator />} />
            <Route path="/wallet" element={<WalletConnect />} />
            <Route path="/nft-marketplace" element={<NFTMarketplace />} />
            <Route path="/identity" element={<DecentralizedIdentity />} />
            <Route path="/transactions" element={<CryptoTransactionHistory />} />
            <Route path="/storage" element={<DecentralizedStorage />} />
            <Route path="/credentials" element={<VerifiableCredentials />} />
            <Route path="/backtest" element={<Backtest />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUp onSignUp={handleLogin} />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/stock/:ticker" element={<StockDetails />} />
          </Routes>
          <Footer />
        </div>
      </main>
    </ThemeProvider>
  );
};

export default App;