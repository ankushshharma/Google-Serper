  // File: src/components/SearchInterface.jsx
import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import './SearchInterface.css';

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
      const response = await axios.post('https://google.serper.dev/search', 
        { q: searchQuery },
        {
          headers: {
            'X-API-KEY': import.meta.env.VITE_API_KEY,
            'Content-Type': 'application/json'
          }
        }
      );

      setResults(response.data);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-container">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="search-box"
      >
        <h1>Search Interface</h1>
        <form onSubmit={handleSearch}>
          <div className="input-wrapper">
            <Search className="search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter your search query..."
              className="search-input"
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading || !searchQuery.trim()}
            className="search-button"
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

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="error-message"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {results && !error && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="results-container"
            >
              {results.organic?.map((result, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="result-card"
                >
                  <h3>
                    <a href={result.link} target="_blank" rel="noopener noreferrer">
                      {result.title}
                    </a>
                  </h3>
                  <p>{result.snippet}</p>
                  <span className="position">Position: {result.position}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default SearchInterface;
