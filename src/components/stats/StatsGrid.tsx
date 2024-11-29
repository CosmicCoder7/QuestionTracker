import React from 'react';
import { StatCard } from './StatCard';
import { useQuestionStore } from '../../store/useQuestionStore';
import { useFilterStore } from '../../store/useFilterStore';

export function StatsGrid() {
  const questions = useQuestionStore((state) => state.questions);
  const setFilter = useFilterStore((state) => state.setFilter);

  const stats = {
    total: questions.length,
    solved: questions.filter((q) => q.status === 'Solved').length,
    inProgress: questions.filter((q) => q.status === 'In Progress').length,
    bookmarked: questions.filter((q) => q.bookmarked).length,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <StatCard
        label="Total Questions"
        value={stats.total}
        variant="total"
        onClick={() => setFilter({ type: 'all' })}
      />
      <StatCard
        label="Solved"
        value={stats.solved}
        variant="solved"
        onClick={() => setFilter({ type: 'status', value: 'Solved' })}
      />
      <StatCard
        label="In Progress"
        value={stats.inProgress}
        variant="inprogress"
        onClick={() => setFilter({ type: 'status', value: 'In Progress' })}
      />
      <StatCard
        label="Bookmarked"
        value={stats.bookmarked}
        variant="bookmarked"
        onClick={() => setFilter({ type: 'bookmarked' })}
      />
    </div>
  );
}