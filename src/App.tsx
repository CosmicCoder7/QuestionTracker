import React, { useState, useEffect } from 'react';
import { QuestionList } from './components/QuestionList';
import { QuestionForm } from './components/QuestionForm';
import { Brain } from 'lucide-react';
import { ThemeToggle } from './components/ThemeToggle';
import { useThemeStore } from './store/useThemeStore';

function App() {
  const [showAddForm, setShowAddForm] = useState(false);
  const isDark = useThemeStore((state) => state.isDark);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h1 className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                Question Manager
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Question
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <QuestionList />
      </main>

      {showAddForm && <QuestionForm onClose={() => setShowAddForm(false)} />}
    </div>
  );
}

export default App;