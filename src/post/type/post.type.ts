export interface Word {
  id: number;
  original_text: string;
  meaning: string;
}

export interface Grammar {
  id: number;
  content: string;
}

export interface Question {
  id: number;
  original_text: string;
  korean: string;
  answer?: string;
}
