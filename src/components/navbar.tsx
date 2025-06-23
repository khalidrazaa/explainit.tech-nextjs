'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [searchText, setSearchText] = useState('');

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      
      {/* Logo on left */}
      <div className="text-xl font-bold text-blue">
        <Link href="/">
          <h1 className="text-xl font-bold text-black">explainit.tech</h1>
        </Link>
      </div>

      {/* Center Nav Buttons */}
      <div className="space-x-6 text-lg font-medium hidden md:flex">
        <Link href="/" className="hover:text-black">Home</Link>
        <Link href="/articles" className="hover:text-blue-600">Articles</Link>
        <Link href="/about" className="hover:text-blue-600">About Us</Link>
      </div>

      {/* Search Bar on Right*/}
      <div className="flex items-center">
        <input
          type="text"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          placeholder="Search Articles..."
          className="px-3 py-1 border rounded-md focus:outline-none focus:ring text-sm"
        />
      </div>
    </nav>
  );
}