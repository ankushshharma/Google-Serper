import React, { useState } from 'react';
import { Loader2 } from 'lucide-react'; // Add this import
import SearchResults from '../components/SearchResults';
import SearchForm from '../components/SearchForm';
import { searchQuery } from '../services/api';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  const handleSearch = async (searchTerm) => {
    setLoading(true);
    setError(null);

    try {
      const data = await searchQuery(searchTerm);
      console.log('Search Results:', data);
      setResults(data);
    } catch (err) {
      setError(err.message);
      console.error('Search Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Search Engine
        </h1>
        <p className="text-gray-600">
          Enter your search query to get detailed results
        </p>
      </div>

      <SearchForm 
        query={query}
        setQuery={setQuery}
        loading={loading}
        onSubmit={handleSearch}
      />

      {error && (
        <div className="mb-8 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center py-8">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-600" />
          <p className="mt-2 text-gray-600">Searching...</p>
        </div>
      )}

      {results && !loading && (
        <SearchResults results={results} setQuery={setQuery} />
      )}
    </div>
  );
};

export default SearchPage;
