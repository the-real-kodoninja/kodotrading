import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Routes, Route, Link } from 'react-router-dom';
import { lightTheme, darkTheme } from './theme';
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
import './App.css';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const handleLogin = (username: string) => {
    setIsAuthenticated(true);
    setUsername(username);
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername(null);
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
      <nav>
        <Link to="/" style={{ margin: '0 10px', color: isDarkMode ? '#E4E6EB' : '#1C2526' }}>Feed</Link>
        <Link to="/profile" style={{ margin: '0 10px', color: isDarkMode ? '#E4E6EB' : '#1C2526' }}>Profile</Link>
        <Link to="/news" style={{ margin: '0 10px', color: isDarkMode ? '#E4E6EB' : '#1C2526' }}>News</Link>
        <Link to="/screener" style={{ margin: '0 10px', color: isDarkMode ? '#E4E6EB' : '#1C2526' }}>Screener</Link>
        <Link to="/nimbus" style={{ margin: '0 10px', color: isDarkMode ? '#E4E6EB' : '#1C2526' }}>Nimbus.AI</Link>
        <Link to="/stoploss" style={{ margin: '0 10px', color: isDarkMode ? '#E4E6EB' : '#1C2526' }}>Stop Loss</Link>
        <Link to="/chat" style={{ margin: '0 10px', color: isDarkMode ? '#E4E6EB' : '#1C2526' }}>Live Chat</Link>
        <Link to="/video" style={{ margin: '0 10px', color: isDarkMode ? '#E4E6EB' : '#1C2526' }}>Live Video</Link>
        <Link to="/portfolio" style={{ margin: '0 10px', color: isDarkMode ? '#E4E6EB' : '#1C2526' }}>Portfolio</Link>
        <Link to="/notifications" style={{ margin: '0 10px', color: isDarkMode ? '#E4E6EB' : '#1C2526' }}>Notifications</Link>
        <Link to="/analytics" style={{ margin: '0 10px', color: isDarkMode ? '#E4E6EB' : '#1C2526' }}>Analytics</Link>
      </nav>
      <SentimentBar />
      <main>
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
        </Routes>
      </main>
    </ThemeProvider>
  );
};

export default App;