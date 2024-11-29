import React, { useState } from 'react';
import { QuestionCard } from './QuestionCard';
import { useQuestionStore } from '../store/useQuestionStore';
import { useFilterStore } from '../store/useFilterStore';
import { Question } from '../types/question';
import { QuestionForm } from './QuestionForm';
import { StatsGrid } from './stats/StatsGrid';

export function QuestionList() {
  const { questions, toggleBookmark, deleteQuestion } = useQuestionStore();
  const filter = useFilterStore((state) => state.filter);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      deleteQuestion(id);
    }
  };

  const filteredQuestions = questions.filter((question) => {
    switch (filter.type) {
      case 'status':
        return question.status === filter.value;
      case 'bookmarked':
        return question.bookmarked;
      default:
        return true;
    }
  });

  return (
    <>
      <StatsGrid />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuestions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            onToggleBookmark={toggleBookmark}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {editingQuestion && (
        <QuestionForm
          initialData={editingQuestion}
          onClose={() => setEditingQuestion(null)}
        />
      )}
    </>
  );
}