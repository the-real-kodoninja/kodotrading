import React, { useState, Suspense, lazy } from 'react';
if (process.env.NODE_ENV !== 'production') {
  const axe = require('@axe-core/react');
  axe(React, ReactDOM, 1000);
}
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Routes, Route, Link } from 'react-router-dom';
import { darkTheme, lightTheme } from './assets/styles/theme';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Web3ProviderComponent } from './context/Web3Context';
import Toolbar from './components/core/Toolbar';
import SentimentBar from './components/core/SentimentBar';
import MobileCompanion from './components/core/MobileCompanion';
import Footer from './components/core/Footer';
import ErrorBoundary from './components/core/ErrorBoundary';
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
  Science as SimulatorIcon,
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  Chat as ChatIcon,
} from '@mui/icons-material';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Drawer, IconButton, Fab, Modal, Box, TextField, Button } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { createPost } from './services/api';
import { buttonStyle, inputStyle } from './assets/styles/styles';
import './assets/styles/App.css';

// Lazy-load components
const Feed = lazy(() => import('./components/feed/Feed'));
const Profile = lazy(() => import('./components/social/Profile'));
const NewsTab = lazy(() => import('./components/social/NewsTab'));
const StockScreener = lazy(() => import('./components/trading/StockScreener'));
const NimbusAI = lazy(() => import('./components/ai/NimbusAI'));
const StopLoss = lazy(() => import('./components/trading/StopLoss'));
const LiveChat = lazy(() => import('./components/social/LiveChat'));
const LiveVideo = lazy(() => import('./components/social/LiveVideo'));
const PortfolioTracker = lazy(() => import('./components/trading/PortfolioTracker'));
const Notifications = lazy(() => import('./components/social/Notifications'));
const Analytics = lazy(() => import('./components/analytics/Analytics'));
const StockPrices = lazy(() => import('./components/analytics/StockPrices'));
const ActivityFeed = lazy(() => import('./components/social/ActivityFeed'));
const WalletConnect = lazy(() => import('./components/web3/WalletConnect'));
const NFTMarketplace = lazy(() => import('./components/web3/NFTMarketplace'));
const DecentralizedIdentity = lazy(() => import('./components/web3/DecentralizedIdentity'));
const CryptoTransactionHistory = lazy(() => import('./components/web3/CryptoTransactionHistory'));
const DecentralizedStorage = lazy(() => import('./components/web3/DecentralizedStorage'));
const VerifiableCredentials = lazy(() => import('./components/web3/VerifiableCredentials'));
const Backtest = lazy(() => import('./components/trading/Backtest'));
const Login = lazy(() => import('./components/auth/Login'));
const SignUp = lazy(() => import('./components/auth/SignUp'));
const Settings = lazy(() => import('./components/auth/Settings'));
const About = lazy(() => import('./components/auth/About'));
const Legal = lazy(() => import('./components/auth/Legal'));
const Terms = lazy(() => import('./components/auth/Terms'));
const Explore = lazy(() => import('./components/explore/Explore'));
const Games = lazy(() => import('./components/games/Games'));
const StockDetails = lazy(() => import('./components/trading/StockDetails'));
const ProfileCustomization = lazy(() => import('./components/social/ProfileCustomization'));
const Alerts = lazy(() => import('./components/trading/Alerts'));
const EducationHub = lazy(() => import('./components/trading/EducationHub'));
const TradeIdeas = lazy(() => import('./components/trading/TradeIdeas'));
const EarningsCalendar = lazy(() => import('./components/trading/EarningsCalendar'));
const MarketMovers = lazy(() => import('./components/trading/MarketMovers'));
const TradeSimulator = lazy(() => import('./components/trading/TradeSimulator'));

const AppContent: React.FC = () => {
  const { isAuthenticated, username, logout, loading: authLoading } = useAuth();
  const [isMobileView, setIsMobileView] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState<React.ReactNode | null>(null);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [chatOpen, setChatOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const openDrawer = (content: React.ReactNode) => {
    setDrawerContent(content);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setDrawerContent(null);
  };

  const handlePostSubmit = async () => {
    if (!username || !postContent.trim()) return;
    try {
      await createPost(postContent, username);
      setPostContent('');
      setPostModalOpen(false);
      // Optionally, refresh the feed here
    } catch (err) {
      console.error('Failed to create post:', err);
    }
  };

  if (authLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Toolbar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        isAuthenticated={isAuthenticated}
        username={username}
        onLogin={() => {}} // No longer needed
        onLogout={logout}
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

          {/* Trading Tools Section */}
          <Accordion sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body2">Trading Tools</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link to="/screener" title="Stock Screener">
                <BarChart />
              </Link>
              <Link to="/portfolio" title="Portfolio Analytics">
                <Assessment />
              </Link>
              <Link to="/alerts" title="Alerts">
                <AlertsIcon />
              </Link>
              <IconButton onClick={() => openDrawer(<EducationHub />)} title="Education Hub">
                <EducationIcon />
              </IconButton>
              <Link to="/trade-ideas" title="Trade Ideas">
                <IdeasIcon />
              </Link>
              <Link to="/earnings" title="Earnings Calendar">
                <CalendarIcon />
              </Link>
              <Link to="/movers" title="Market Movers">
                <MoversIcon />
              </Link>
              <IconButton onClick={() => openDrawer(<TradeSimulator />)} title="Trade Simulator">
                <SimulatorIcon />
              </IconButton>
            </AccordionDetails>
          </Accordion>

          {/* Web3 Features Section */}
          <Accordion sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body2">Web3 Features</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
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
            </AccordionDetails>
          </Accordion>

          {/* Authentication Section */}
          {!isAuthenticated && (
            <Link to="/login" title="Login">
              <LoginIcon />
            </Link>
          )}
        </div>
        <div className="content">
          <MobileCompanion onToggle={setIsMobileView} />
          <SentimentBar />
          <Suspense fallback={<Typography>Loading...</Typography>}>
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
              <Route path="/trade-ideas" element={<TradeIdeas />} />
              <Route path="/earnings" element={<EarningsCalendar />} />
              <Route path="/movers" element={<MarketMovers />} />
              <Route path="/wallet" element={<WalletConnect />} />
              <Route path="/nft-marketplace" element={<NFTMarketplace />} />
              <Route path="/identity" element={<DecentralizedIdentity />} />
              <Route path="/transactions" element={<CryptoTransactionHistory />} />
              <Route path="/storage" element={<DecentralizedStorage />} />
              <Route path="/credentials" element={<VerifiableCredentials />} />
              <Route path="/backtest" element={<Backtest />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/about" element={<About />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/stock/:ticker" element={<StockDetails />} />
            </Routes>
          </Suspense>
          <Footer />
        </div>
        <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer} sx={{ width: 400 }}>
          <Box sx={{ width: 400, p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Feature</Typography>
              <IconButton onClick={closeDrawer}>
                <CloseIcon />
              </IconButton>
            </Box>
            {drawerContent}
          </Box>
        </Drawer>

        {/* Floating Post Button and Modal */}
        {isAuthenticated && (
          <>
            <Fab
              color="primary"
              aria-label="add post"
              sx={{ position: 'fixed', bottom: 80, left: 20 }}
              onClick={() => setPostModalOpen(true)}
            >
              <AddIcon />
            </Fab>
            <Modal open={postModalOpen} onClose={() => setPostModalOpen(false)}>
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: { xs: '90%', sm: 400 },
                  bgcolor: 'background.paper',
                  boxShadow: 24,
                  p: 4,
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Create a Post
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="What's on your mind?"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  variant="outlined"
                  sx={{ ...inputStyle, mb: 2 }}
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    onClick={handlePostSubmit}
                    sx={buttonStyle}
                    disabled={!postContent.trim()}
                  >
                    Post
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setPostModalOpen(false)}
                    sx={buttonStyle}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Modal>
          </>
        )}

        {/* Floating Chat Button and Popup */}
        <Fab
          color="secondary"
          aria-label="chat"
          sx={{ position: 'fixed', bottom: 20, right: 20 }}
          onClick={() => setChatOpen(!chatOpen)}
        >
          <ChatIcon />
        </Fab>
        {chatOpen && (
          <Box
            sx={{
              position: 'fixed',
              bottom: 80,
              right: 20,
              width: { xs: '90%', sm: 300 },
              height: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              borderRadius: 2,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              Chat
            </Typography>
            <Box sx={{ flex: 1, overflowY: 'auto', mb: 1 }}>
              {/* Mock chat messages */}
              <Typography variant="body2" color="text.secondary">
                User1: Hey, how's it going?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                You: Going great, thanks!
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                placeholder="Type a message..."
                variant="outlined"
                size="small"
                sx={inputStyle}
              />
              <Button variant="contained" sx={buttonStyle}>
                Send
              </Button>
            </Box>
          </Box>
        )}
      </main>
    </ThemeProvider>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <Web3ProviderComponent>
      <ErrorBoundary>
        <AppContent />
      </ErrorBoundary>
    </Web3ProviderComponent>
  </AuthProvider>
);

export default App;