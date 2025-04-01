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
        <Link to="/" style={{ margin: '0 10px', color: isDarkMode ? '#FFFFFF' : '#353839' }}>Feed</Link>
        <Link to="/profile" style={{ margin: '0 10px', color: isDarkMode ? '#FFFFFF' : '#353839' }}>Profile</Link>
        <Link to="/news" style={{ margin: '0 10px', color: isDarkMode ? '#FFFFFF' : '#353839' }}>News</Link>
        <Link to="/screener" style={{ margin: '0 10px', color: isDarkMode ? '#FFFFFF' : '#353839' }}>Screener</Link>
        <Link to="/nimbus" style={{ margin: '0 10px', color: isDarkMode ? '#FFFFFF' : '#353839' }}>Nimbus.AI</Link>
        <Link to="/stoploss" style={{ margin: '0 10px', color: isDarkMode ? '#FFFFFF' : '#353839' }}>Stop Loss</Link>
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
        </Routes>
      </main>
    </ThemeProvider>
  );
};

export default App;