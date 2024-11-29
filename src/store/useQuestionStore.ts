import { create } from 'zustand';
import { Question, Difficulty, Status } from '../types/question';
import { loadQuestions, saveQuestions } from '../lib/localStorage';

interface QuestionStore {
  questions: Question[];
  addQuestion: (question: Omit<Question, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateQuestion: (id: string, question: Partial<Question>) => void;
  deleteQuestion: (id: string) => void;
  toggleBookmark: (id: string) => void;
  updateTimer: (id: string, timeSpent: number) => void;
}

export const useQuestionStore = create<QuestionStore>((set) => ({
  questions: loadQuestions(),
  addQuestion: (question) =>
    set((state) => {
      const newQuestions = [
        ...state.questions,
        {
          ...question,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      saveQuestions(newQuestions);
      return { questions: newQuestions };
    }),
  updateQuestion: (id, updatedQuestion) =>
    set((state) => {
      const newQuestions = state.questions.map((q) =>
        q.id === id ? { ...q, ...updatedQuestion, updatedAt: new Date() } : q
      );
      saveQuestions(newQuestions);
      return { questions: newQuestions };
    }),
  deleteQuestion: (id) =>
    set((state) => {
      const newQuestions = state.questions.filter((q) => q.id !== id);
      saveQuestions(newQuestions);
      return { questions: newQuestions };
    }),
  toggleBookmark: (id) =>
    set((state) => {
      const newQuestions = state.questions.map((q) =>
        q.id === id ? { ...q, bookmarked: !q.bookmarked } : q
      );
      saveQuestions(newQuestions);
      return { questions: newQuestions };
    }),
  updateTimer: (id, timeSpent) =>
    set((state) => {
      const newQuestions = state.questions.map((q) =>
        q.id === id ? { ...q, timeSpent } : q
      );
      saveQuestions(newQuestions);
      return { questions: newQuestions };
    }),
}));