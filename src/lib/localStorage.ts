import { Question } from '../types/question';

const QUESTIONS_KEY = 'questions';
const THEME_KEY = 'theme';

export function saveQuestions(questions: Question[]) {
  localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questions));
}

export function loadQuestions(): Question[] {
  const stored = localStorage.getItem(QUESTIONS_KEY);
  if (!stored) return [];
  
  const questions = JSON.parse(stored);
  return questions.map((q: any) => ({
    ...q,
    createdAt: new Date(q.createdAt),
    updatedAt: new Date(q.updatedAt),
  }));
}

export function saveTheme(isDark: boolean) {
  localStorage.setItem(THEME_KEY, JSON.stringify(isDark));
}

export function loadTheme(): boolean {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === null) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return JSON.parse(stored);
}