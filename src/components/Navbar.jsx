import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-white shadow-sm">
    <div className="max-w-4xl mx-auto px-6 py-4">
      <Link to="/" className="text-xl font-bold text-indigo-600">
        Search App
      </Link>
    </div>
  </nav>
);

export default Navbar;