import { useQuery } from '@tanstack/react-query';
import { fetchMarketNews, MarketNews } from '@/lib/finnhub';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export const NewsSection = () => {
  const { data: news, isLoading } = useQuery({
    queryKey: ['marketNews'],
    queryFn: fetchMarketNews,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Market News</h2>
      {news?.slice(0, 5).map((item: MarketNews) => (
        <Card key={item.id} className="hover:bg-secondary/50 transition-colors">
          <CardContent className="p-4">
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="block">
              <h3 className="font-semibold mb-2">{item.headline}</h3>
              <p className="text-sm text-gray-600">{item.summary}</p>
              <div className="text-xs text-gray-500 mt-2">
                {new Date(item.datetime * 1000).toLocaleDateString()} • {item.source}
              </div>
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};