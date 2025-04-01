import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; // Import Routes, Route, and Link
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import Toolbar from './components/Toolbar';
import Feed from './components/Feed';
import NewsTab from './components/NewsTab';
import Profile from './components/Profile';
import SentimentBar from './components/SentimentBar';
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
    <BrowserRouter>
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
          <Link to="/feed" style={{ margin: '0 10px', color: isDarkMode ? '#FFFFFF' : '#353839' }}>Feed</Link>
          <Link to="/news" style={{ margin: '0 10px', color: isDarkMode ? '#FFFFFF' : '#353839' }}>News</Link>
          <Link to="/profile" style={{ margin: '0 10px', color: isDarkMode ? '#FFFFFF' : '#353839' }}>Profile</Link>
        </nav>
        <SentimentBar />
        <main>
          <Routes>
            <Route path="/feed" element={<Feed />} />
            <Route path="/news" element={<NewsTab />} />
            <Route path="/profile" element={<Profile trades={200} followers={500} bio="Swing trader since 2015." />} />
          </Routes>
        </main>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;