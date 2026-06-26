'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  if (pathname === '/login') return null;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Meds', href: '/dashboard/medicine' },
    { name: 'Water', href: '/dashboard/water' },
    { name: 'Sleep', href: '/dashboard/sleep' },
    { name: 'Diet', href: '/dashboard/diet' },
    { name: 'Profile', href: '/dashboard/profile' },
  ];

  const isActive = (href) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#FBFBF2]/80 backdrop-blur-md border-b border-[#EFF1EA] px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-12">
        <Link href="/" className="text-2xl font-bold text-[#455D54]">
          HealthMate
        </Link>
        <div className="hidden md:flex items-center gap-6 text-[#5A7067] font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`${
                isActive(link.href)
                  ? 'text-[#455D54] relative after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-[#455D54]'
                  : 'hover:text-[#455D54] transition-colors'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-sm font-bold text-[#2F3E38]">
              {user.displayName || user.email}
            </span>
            <button
              onClick={logout}
              className="px-4 py-2 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-xl transition-all active:scale-95 border border-red-100"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="px-4 py-2 text-xs font-bold text-[#455D54] hover:text-[#344840] bg-[#E1EAE5] rounded-xl transition-all active:scale-95"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
