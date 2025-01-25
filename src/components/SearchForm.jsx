import React from 'react';
import { Search, Loader2 } from 'lucide-react';

const SearchForm = ({ query, setQuery, loading, onSubmit }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    try {
      await onSubmit(query.trim());
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your search query..."
          className="w-full px-6 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-300 pr-14"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 className="w-6 h-6 text-white animate-spin" />
          ) : (
            <Search className="w-6 h-6 text-white" />
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
