import { useState } from 'react';
import { setApiKey } from '@/lib/finnhub';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

export const ApiKeyInput = () => {
  const [key, setKey] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApiKey(key);
    toast({
      title: "API Key Saved",
      description: "Your Finnhub API key has been saved successfully.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter your Finnhub API key"
          className="flex-1"
        />
        <Button type="submit">Save Key</Button>
      </div>
      <p className="text-sm text-gray-500">
        Get your API key from{' '}
        <a
          href="https://finnhub.io/register"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Finnhub.io
        </a>
      </p>
    </form>
  );
};