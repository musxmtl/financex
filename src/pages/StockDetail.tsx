import { useParams } from '@remix-run/react';
import { useQuery } from '@tanstack/react-query';
import { fetchStockQuote } from '@/lib/finnhub';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StockDetail = () => {
  const { symbol } = useParams<{ symbol: string }>();
  
  const { data: quote, isLoading } = useQuery({
    queryKey: ['quote', symbol],
    queryFn: () => fetchStockQuote(symbol!),
    enabled: !!symbol,
  });

  if (!symbol) {
    return <div>Invalid stock symbol</div>;
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-baseline gap-4">
          <h1 className="text-4xl font-bold">{symbol}</h1>
          {quote && (
            <div className={`text-2xl ${quote.dp > 0 ? 'text-success' : 'text-danger'}`}>
              ${quote.c.toFixed(2)} ({quote.dp > 0 ? '+' : ''}{quote.dp.toFixed(2)}%)
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        ) : quote ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Today's Trading</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Open</div>
                    <div className="font-semibold">${quote.o.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Previous Close</div>
                    <div className="font-semibold">${quote.pc.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">High</div>
                    <div className="font-semibold">${quote.h.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Low</div>
                    <div className="font-semibold">${quote.l.toFixed(2)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default StockDetail;