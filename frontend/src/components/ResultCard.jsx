import React from 'react';

const ResultCard = ({ title, link, snippet }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
    <a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <h3 className="text-lg font-semibold mb-2 text-indigo-600 hover:text-indigo-700">
        {title}
      </h3>
      <p className="text-sm text-gray-600 mb-2">{link}</p>
      <p className="text-gray-700">{snippet}</p>
    </a>
  </div>
);

export default ResultCard;