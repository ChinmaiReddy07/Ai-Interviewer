import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain } from 'lucide-react';

export const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI Interviewer
            </span>
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                location.pathname === '/' 
                  ? 'text-blue-600' 
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/setup" 
              className={`font-medium transition-colors ${
                location.pathname === '/setup' 
                  ? 'text-blue-600' 
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              Practice
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};