// 题库相关类型定义

export type QuestionCategory = 
  | 'technical'    // 技术题
  | 'non-technical' // 非技术题
  | 'behavioral'   // 行为面
  | 'brain-teaser' // 脑经急转弯
  | 'system-design'; // 系统设计

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  category: QuestionCategory;
  difficulty: Difficulty;
  title: string;
  content: string;
  answer: string;
  analysis: string;
  tags: string[];
  relatedJob?: string; // 关联岗位
  views: number;
  createdAt: string;
}

export interface CategoryInfo {
  id: QuestionCategory;
  name: string;
  icon: string;
  description: string;
  color: string;
  questionCount: number;
}

export interface FavoritesStore {
  questionIds: string[];
  addedAt: Record<string, string>; // questionId -> ISO timestamp
}