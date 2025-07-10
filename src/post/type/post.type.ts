export interface Word {
  id: number;
  original_text: string;
  meaning: string;
}

export interface Question {
  original_text: string;
  korean: string;
  answer?: string;
}

export enum Level {
  level1 = 1,
  level2,
  level3,
  level4,
  level5,
  level6,
  level7,
  level8,
  level9,
  level10,
  level11,
  level12,
  level13,
  level14,
  level15,
  level16,
  level17,
  level18,
}
