import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

interface WatchlistProps {
  watchlist: string[];
  setWatchlist: React.Dispatch<React.SetStateAction<string[]>>;
}

interface WatchlistData {
  name: string;
  tickers: { ticker: string; note: string }[];
}

const Watchlist: React.FC<WatchlistProps> = ({ watchlist, setWatchlist }) => {
  const [watchlists, setWatchlists] = useState<WatchlistData[]>([
    { name: 'Default', tickers: watchlist.map((ticker) => ({ ticker, note: '' })) },
    { name: 'Tech Stocks', tickers: [{ ticker: 'MSFT', note: 'Strong earnings expected' }] },
  ]);
  const [tab, setTab] = useState(0);
  const [newTicker, setNewTicker] = useState('');
  const [newWatchlistName, setNewWatchlistName] = useState('');
  const [editingNote, setEditingNote] = useState<{ watchlistIndex: number; tickerIndex: number; note: string } | null>(null);

  const handleAddTicker = () => {
    if (!newTicker) return;
    setWatchlists((prev) => {
      const updated = [...prev];
      updated[tab].tickers.push({ ticker: newTicker.toUpperCase(), note: '' });
      return updated;
    });
    setWatchlist((prev) => [...new Set([...prev, newTicker.toUpperCase()])]);
    setNewTicker('');
  };

  const handleDeleteTicker = (watchlistIndex: number, tickerIndex: number) => {
    setWatchlists((prev) => {
      const updated = [...prev];
      const ticker = updated[watchlistIndex].tickers[tickerIndex].ticker;
      updated[watchlistIndex].tickers.splice(tickerIndex, 1);
      return updated;
    });
    setWatchlist((prev) => prev.filter((t) => t !== watchlists[watchlistIndex].tickers[tickerIndex].ticker));
  };

  const handleAddWatchlist = () => {
    if (!newWatchlistName) return;
    setWatchlists((prev) => [...prev, { name: newWatchlistName, tickers: [] }]);
    setNewWatchlistName('');
  };

  const handleEditNote = (watchlistIndex: number, tickerIndex: number, note: string) => {
    setEditingNote({ watchlistIndex, tickerIndex, note });
  };

  const handleSaveNote = () => {
    if (!editingNote) return;
    setWatchlists((prev) => {
      const updated = [...prev];
      updated[editingNote.watchlistIndex].tickers[editingNote.tickerIndex].note = editingNote.note;
      return updated;
    });
    setEditingNote(null);
  };

  return (
    <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', p: 2, borderRadius: 2, mb: 2 }}>
      <Typography variant="body2" sx={{ fontSize: '0.8rem', mb: 1 }}>
        WATCHLIST
      </Typography>
      <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} sx={{ mb: 2 }}>
        {watchlists.map((wl, index) => (
          <Tab key={index} label={wl.name} />
        ))}
      </Tabs>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          placeholder="Add ticker (e.g., AAPL)"
          value={newTicker}
          onChange={(e) => setNewTicker(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ flexGrow: 1 }}
        />
        <Button variant="contained" color="primary" onClick={handleAddTicker}>
          Add
        </Button>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          placeholder="New watchlist name"
          value={newWatchlistName}
          onChange={(e) => setNewWatchlistName(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ flexGrow: 1 }}
        />
        <Button variant="contained" color="primary" onClick={handleAddWatchlist}>
          Add Watchlist
        </Button>
      </Box>
      <List>
        {watchlists[tab].tickers.map((item, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <>
                <IconButton onClick={() => handleEditNote(tab, index, item.note)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteTicker(tab, index)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={item.ticker} secondary={item.note || 'No note'} />
          </ListItem>
        ))}
      </List>
      {editingNote && (
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Edit Note"
            value={editingNote.note}
            onChange={(e) => setEditingNote((prev) => prev && { ...prev, note: e.target.value })}
            variant="outlined"
            size="small"
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleSaveNote}>
            Save Note
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Watchlist;