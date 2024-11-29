export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type Status = 'Solved' | 'Unsolved' | 'In Progress';

export interface Tag {
  id: string;
  name: string;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  status: Status;
  githubLink?: string;
  solution?: string;
  timeSpent: number;
  bookmarked: boolean;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
}