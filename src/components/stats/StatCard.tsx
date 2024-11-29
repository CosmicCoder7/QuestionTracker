import React from 'react';
import { cn } from '../../lib/utils';

interface StatCardProps {
  label: string;
  value: number;
  variant: 'solved' | 'inprogress' | 'bookmarked' | 'total';
  onClick?: () => void;
}

const variantStyles = {
  solved: 'bg-green-50 text-green-700 dark:bg-green-900/50 dark:text-green-300',
  inprogress: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300',
  bookmarked: 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
  total: 'bg-purple-50 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300',
};

export function StatCard({ label, value, variant, onClick }: StatCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-lg p-4 transition-all duration-200 hover:scale-105',
        'flex flex-col items-center justify-center gap-2',
        'cursor-pointer shadow-sm hover:shadow-md',
        variantStyles[variant]
      )}
    >
      <span className="text-3xl font-bold">{value}</span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}