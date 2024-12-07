import { Layout } from '@/components/Layout';
import { SearchBar } from '@/components/SearchBar';
import { MarketOverview } from '@/components/MarketOverview';
import { NewsSection } from '@/components/NewsSection';

const Index = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Market Dashboard</h1>
          <SearchBar />
        </div>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Market Overview</h2>
          <MarketOverview />
        </section>

        <section>
          <NewsSection />
        </section>
      </div>
    </Layout>
  );
};

export default Index;