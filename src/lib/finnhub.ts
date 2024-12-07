// Get API key from localStorage or use a default value
const getApiKey = () => localStorage.getItem('finnhub_api_key') || '';

export interface StockQuote {
  c: number; // Current price
  d: number; // Change
  dp: number; // Percent change
  h: number; // High price of the day
  l: number; // Low price of the day
  o: number; // Open price of the day
  pc: number; // Previous close price
}

export interface MarketNews {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

export const fetchStockQuote = async (symbol: string): Promise<StockQuote> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('Please set your Finnhub API key in the settings');
  }
  
  const response = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch stock quote');
  }
  return response.json();
};

export const fetchMarketNews = async (): Promise<MarketNews[]> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('Please set your Finnhub API key in the settings');
  }

  const response = await fetch(
    `https://finnhub.io/api/v1/news?category=general&token=${apiKey}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch market news');
  }
  return response.json();
};

export const searchStocks = async (query: string) => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('Please set your Finnhub API key in the settings');
  }

  const response = await fetch(
    `https://finnhub.io/api/v1/search?q=${query}&token=${apiKey}`
  );
  if (!response.ok) {
    throw new Error('Failed to search stocks');
  }
  return response.json();
};

// Function to set the API key
export const setApiKey = (key: string) => {
  localStorage.setItem('finnhub_api_key', key);
};