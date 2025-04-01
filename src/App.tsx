import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import Toolbar from './components/Toolbar';
import Feed from './components/Feed';
import Profile from './components/Profile';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Toolbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main>
        <Feed />
        <Profile />
      </main>
    </ThemeProvider>
  );
};

export default App;