import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Divider, Chip, Card } from '@mui/material';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import OptionsChain from './OptionsChain';
import { containerStyle, typographyHeaderStyle, cardStyle } from '../../assets/styles/styles';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface StockDetailsProps {
  ticker: string;
}

interface StockData {
  ticker: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  peRatio: number;
  dividendYield: number;
  week52High: number;
  week52Low: number;
  avgVolume: number;
  beta: number;
  sector: string;
  industry: string;
  earningsDate: string;
  analystRating: string;
  targetPrice: number;
}

const StockDetails: React.FC<StockDetailsProps> = ({ ticker }) => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        setLoading(true);
        const apiKey = 'UQT63EJQGDNDK2QL';
        const overviewResponse = await axios.get(
          `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${apiKey}`
        );
        const quoteResponse = await axios.get(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${apiKey}`
        );
        const timeSeriesResponse = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${apiKey}`
        );

        const overview = overviewResponse.data;
        const quote = quoteResponse.data['Global Quote'];
        const timeSeries = timeSeriesResponse.data['Time Series (Daily)'];

        if (!overview || !quote || !timeSeries) {
          throw new Error('Failed to fetch stock data');
        }

        const data: StockData = {
          ticker,
          price: parseFloat(quote['05. price']),
          change: parseFloat(quote['09. change']),
          changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
          volume: parseInt(quote['06. volume']),
          marketCap: parseFloat(overview.MarketCapitalization),
          peRatio: parseFloat(overview.PERatio),
          dividendYield: parseFloat(overview.DividendYield) * 100,
          week52High: parseFloat(overview['52WeekHigh']),
          week52Low: parseFloat(overview['52WeekLow']),
          avgVolume: parseInt(overview.AverageDailyVolume) || 0,
          beta: parseFloat(overview.Beta),
          sector: overview.Sector,
          industry: overview.Industry,
          earningsDate: overview.LatestQuarter,
          analystRating: overview.AnalystTargetPrice ? 'Buy' : 'Hold',
          targetPrice: parseFloat(overview.AnalystTargetPrice) || 0,
        };

        // Prepare chart data
        const dates = Object.keys(timeSeries).slice(0, 30).reverse();
        const prices = dates.map((date) => parseFloat(timeSeries[date]['4. close']));

        setChartData({
          labels: dates,
          datasets: [
            {
              label: `${ticker} Price`,
              data: prices,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
            },
          ],
        });

        setStockData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load stock data. Please try again later.');
        setLoading(false);
      }
    };

    fetchStockData();
  }, [ticker]);

  if (loading) {
    return <Container sx={containerStyle}><Typography>Loading...</Typography></Container>;
  }

  if (error || !stockData) {
    return <Container sx={containerStyle}><Typography color="error">{error || 'No data available'}</Typography></Container>;
  }

  return (
    <Container sx={containerStyle}>
      <Typography variant="h5" sx={typographyHeaderStyle}>
        {stockData.ticker} Stock Details
      </Typography>
      <Box sx={cardStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">
            ${stockData.price.toFixed(2)}
          </Typography>
          <Typography variant="h6" color={stockData.change >= 0 ? 'success.main' : 'error.main'}>
            {stockData.change >= 0 ? '+' : ''}{stockData.change.toFixed(2)} ({stockData.changePercent.toFixed(2)}%)
          </Typography>
        </Box>
        <Card sx={{ mb: 2 }}>
          {chartData && (
            <Line
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: true, text: `${ticker} Price (Last 30 Days)` },
                },
              }}
            />
          )}
        </Card>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">Volume</Typography>
            <Typography variant="body1">{stockData.volume.toLocaleString()}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Market Cap</Typography>
            <Typography variant="body1">${(stockData.marketCap / 1000000000).toFixed(2)}B</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">P/E Ratio</Typography>
            <Typography variant="body1">{stockData.peRatio.toFixed(2)}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Dividend Yield</Typography>
            <Typography variant="body1">{stockData.dividendYield.toFixed(2)}%</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">52-Week High</Typography>
            <Typography variant="body1">${stockData.week52High.toFixed(2)}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">52-Week Low</Typography>
            <Typography variant="body1">${stockData.week52Low.toFixed(2)}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Avg. Volume</Typography>
            <Typography variant="body1">{stockData.avgVolume.toLocaleString()}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Beta</Typography>
            <Typography variant="body1">{stockData.beta.toFixed(2)}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Sector</Typography>
            <Typography variant="body1">{stockData.sector}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Industry</Typography>
            <Typography variant="body1">{stockData.industry}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Earnings Date</Typography>
            <Typography variant="body1">{stockData.earningsDate}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Analyst Rating</Typography>
            <Chip label={stockData.analystRating} color={stockData.analystRating === 'Buy' ? 'success' : 'default'} />
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Target Price</Typography>
            <Typography variant="body1">${stockData.targetPrice.toFixed(2)}</Typography>
          </Box>
        </Box>
      </Box>
      <OptionsChain ticker={stockData.ticker} />
    </Container>
  );
};

export default StockDetails;