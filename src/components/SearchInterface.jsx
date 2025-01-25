import React, { useState } from 'react';
import { Search, Loader2, Stars } from 'lucide-react';

const SearchInterface = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: {
          'X-API-KEY': import.meta.env.VITE_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ q: searchQuery })
      });
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-8 bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <Stars 
            key={i}
            className={`absolute text-white/10 animate-bounce delay-${i}`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 1}s`
            }}
            size={24}
          />
        ))}
      </div>
      
      <div className="w-full max-w-4xl bg-white/5 p-12 rounded-3xl backdrop-blur-lg shadow-2xl border border-white/10">
        <h1 className="text-5xl font-bold text-center mb-4 text-white">
          Sense<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Through</span>
        </h1>
        
        <p className="text-lg text-gray-400 text-center mb-8">
          Discover knowledge through intelligent search
        </p>

        <form onSubmit={handleSearch} className="space-y-6">
          <div className="relative bg-white/5 rounded-2xl p-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter your search query..."
              className="w-full py-4 px-6 bg-white/5 text-white rounded-xl border-2 border-white/10 text-lg focus:outline-none focus:border-blue-500 transition-colors"
            />
            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>

          <button 
            type="submit" 
            disabled={isLoading || !searchQuery.trim()}
            className="w-full py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-xl text-lg font-semibold flex items-center justify-center gap-3 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search />
                Search
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-500/20 text-red-200 rounded-xl text-center">
            {error}
          </div>
        )}

        {results?.organic && (
          <div className="mt-8 space-y-4">
            {results.organic.map((result, index) => (
              <div 
                key={index}
                className="p-6 bg-white/5 rounded-xl border border-white/10 hover:translate-y-1 hover:shadow-xl hover:border-blue-500/50 transition-all"
              >
                <h3>
                  <a 
                    href={result.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xl text-blue-400 hover:text-blue-300"
                  >
                    {result.title}
                  </a>
                </h3>
                <p className="mt-2 text-gray-300">{result.snippet}</p>
                <span className="mt-2 text-sm text-gray-500">Position: {result.position}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchInterface;