import React from 'react';
import { Sun, Moon, Leaf } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { Navigation } from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <nav className="bg-white dark:bg-gray-800 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col space-y-4 py-4 md:flex-row md:items-center md:justify-between md:space-y-0 md:py-0">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <Leaf className="h-8 w-8 text-green-500" />
                  <span className="ml-2 text-xl font-semibold dark:text-white">
                    Smart Agriculture
                  </span>
                </div>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 md:hidden"
                >
                  {isDark ? (
                    <Sun className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <Moon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
              <div className="flex items-center justify-between space-x-4">
                <Navigation />
                <button
                  onClick={toggleTheme}
                  className="hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 md:block"
                >
                  {isDark ? (
                    <Sun className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <Moon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}