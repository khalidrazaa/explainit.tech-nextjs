'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [search, setSearch] = useState('');

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <div className="flex gap-6 text-lg font-medium">
        <Link href="/">Home</Link>
        <Link href="/articles">Articles</Link>
        <Link href="/about">About Us</Link>
      </div>

      <div>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search..."
          className="px-3 py-1 border rounded-md focus:outline-none focus:ring"
        />
      </div>
    </nav>
  );
}