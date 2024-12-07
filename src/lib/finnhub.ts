const FINNHUB_API_KEY = 'YOUR_API_KEY'; // Users will need to replace this with their actual API key

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
  const response = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch stock quote');
  }
  return response.json();
};

export const fetchMarketNews = async (): Promise<MarketNews[]> => {
  const response = await fetch(
    `https://finnhub.io/api/v1/news?category=general&token=${FINNHUB_API_KEY}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch market news');
  }
  return response.json();
};

export const searchStocks = async (query: string) => {
  const response = await fetch(
    `https://finnhub.io/api/v1/search?q=${query}&token=${FINNHUB_API_KEY}`
  );
  if (!response.ok) {
    throw new Error('Failed to search stocks');
  }
  return response.json();
};