import axios from 'axios';

const API_KEY = import.meta.env.VITE_SERPER_API_KEY;

export const searchQuery = async (query) => {
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://google.serper.dev/search',
    headers: {
      'X-API-KEY': API_KEY,
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({ q: query })
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error('Search API Error:', error);
    throw new Error('Failed to fetch search results');
  }
};
