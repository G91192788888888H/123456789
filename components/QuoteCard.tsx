import React from 'react';
import { Quote } from '../types';
import Loader from './Loader';
import { ExclamationTriangleIcon } from './Icons';

interface QuoteCardProps {
  quote: Quote | null;
  isLoading: boolean;
  error: string | null;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, isLoading, error }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 min-h-[250px] flex items-center justify-center p-8 border border-stone-200">
      <div className="text-center w-full">
        {isLoading && <Loader />}
        {error && !isLoading && (
          <div className="flex flex-col items-center text-red-700">
            <ExclamationTriangleIcon className="w-12 h-12 mb-4" />
            <p className="font-semibold text-lg">An Error Occurred</p>
            <p className="text-red-600">{error}</p>
          </div>
        )}
        {!isLoading && !error && quote && (
          <blockquote className="animate-fade-in">
            <p className="text-3xl md:text-4xl font-bold text-stone-900 leading-relaxed font-playfair">
              “{quote.quote}”
            </p>
            <footer className="mt-6 text-lg text-stone-600 italic">
              — <cite>{quote.author}</cite>
            </footer>
          </blockquote>
        )}
      </div>
    </div>
  );
};

export default QuoteCard;