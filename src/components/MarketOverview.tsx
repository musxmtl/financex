import { useQuery } from '@tanstack/react-query';
import { fetchStockQuote } from '@/lib/finnhub';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const MARKET_INDICES = [
  { symbol: 'SPY', name: 'S&P 500' },
  { symbol: 'QQQ', name: 'NASDAQ' },
  { symbol: 'DIA', name: 'Dow Jones' },
];

export const MarketOverview = () => {
  const queries = MARKET_INDICES.map((index) => ({
    queryKey: ['quote', index.symbol],
    queryFn: () => fetchStockQuote(index.symbol),
  }));

  const results = queries.map((query) => useQuery(query));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {MARKET_INDICES.map((index, i) => {
        const { data, isLoading } = results[i];
        
        return (
          <Card key={index.symbol} className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-lg">{index.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-16 flex items-center justify-center">
                  <div className="animate-pulse bg-gray-200 h-4 w-20 rounded"></div>
                </div>
              ) : data ? (
                <div className="space-y-2">
                  <div className="text-2xl font-bold">${data.c.toFixed(2)}</div>
                  <div className={`text-sm ${data.dp > 0 ? 'text-success' : 'text-danger'}`}>
                    {data.dp > 0 ? '+' : ''}{data.dp.toFixed(2)}%
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};