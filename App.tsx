import React, { useState, useEffect, useCallback } from 'react';
import { Quote } from './types';
import { generateQuote } from './services/geminiService';
import QuoteCard from './components/QuoteCard';
import { BookOpenIcon, ArrowPathIcon } from './components/Icons';

const App: React.FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const newQuote = await generateQuote();
      setQuote(newQuote);
    } catch (err) {
      setError('Failed to fetch a quote. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-amber-50 text-stone-800 flex flex-col items-center justify-center p-4 selection:bg-stone-300 selection:text-stone-900">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <BookOpenIcon className="w-8 h-8 text-stone-600" />
            <h1 className="text-4xl font-bold text-stone-800 tracking-tight font-playfair">
              Quote Generator
            </h1>
          </div>
          <p className="text-lg text-stone-500">
            Your daily dose of inspiration, powered by Gemini.
          </p>
        </header>

        <main>
          <QuoteCard quote={quote} isLoading={isLoading} error={error} />
          <div className="mt-8 flex justify-center">
            <button
              onClick={fetchQuote}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-stone-800 text-amber-50 font-semibold rounded-lg shadow-md hover:bg-stone-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 transition-colors duration-300 ease-in-out disabled:bg-stone-400 disabled:cursor-not-allowed"
            >
              <ArrowPathIcon className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Generating...' : 'New Quote'}</span>
            </button>
          </div>
        </main>
      </div>

      <footer className="absolute bottom-4 text-center text-stone-500 text-sm">
        <p>Built with React, Tailwind CSS, and the Google Gemini API.</p>
      </footer>
    </div>
  );
};

export default App;