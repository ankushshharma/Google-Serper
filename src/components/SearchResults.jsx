import React, { useState } from 'react';
import ResultCard from './ResultCard';

const SearchResults = ({ results, setQuery }) => {
  const [activeTab, setActiveTab] = useState('organic');

  return (
    <div className="animate-fadeIn">
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab('organic')}
          className={`px-6 py-3 font-medium transition-colors duration-300 ${
            activeTab === 'organic'
              ? 'border-b-2 border-indigo-600 text-indigo-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Search Results
        </button>
        {results.knowledgeGraph && (
          <button
            onClick={() => setActiveTab('knowledge')}
            className={`px-6 py-3 font-medium transition-colors duration-300 ${
              activeTab === 'knowledge'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Knowledge Graph
          </button>
        )}
      </div>

      <div className="space-y-6">
        {activeTab === 'organic' && results.organic && (
          results.organic.map((result, index) => (
            <ResultCard
              key={index}
              title={result.title}
              link={result.link}
              snippet={result.snippet}
            />
          ))
        )}

        {activeTab === 'knowledge' && results.knowledgeGraph && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">
              {results.knowledgeGraph.title}
            </h2>
            {results.knowledgeGraph.type && (
              <p className="text-gray-600 mb-2">Type: {results.knowledgeGraph.type}</p>
            )}
            {results.knowledgeGraph.description && (
              <p className="text-gray-700">
                {results.knowledgeGraph.description}
              </p>
            )}
          </div>
        )}
      </div>

      {results.relatedSearches && (
        <div className="mt-8 pt-8 border-t">
          <h3 className="text-lg font-semibold mb-4">Related Searches</h3>
          <div className="flex flex-wrap gap-2">
            {results.relatedSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => setQuery(search)}
                className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm transition-colors duration-300"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
