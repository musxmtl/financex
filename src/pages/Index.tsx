import { Layout } from '@/components/Layout';
import { SearchBar } from '@/components/SearchBar';
import { MarketOverview } from '@/components/MarketOverview';
import { NewsSection } from '@/components/NewsSection';
import { ApiKeyInput } from '@/components/ApiKeyInput';

const Index = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Market Dashboard</h1>
          <div className="max-w-xl mx-auto">
            <ApiKeyInput />
          </div>
          <div className="mt-4">
            <SearchBar />
          </div>
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