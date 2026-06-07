export interface ProcessingImage {
  id: string;
  file: File;
  name: string;
  originalSize: number;
  originalWidth: number;
  originalHeight: number;
  previewUrl: string;
  status: 'idle' | 'processing' | 'completed' | 'failed';
  error?: string;
  convertedBlob?: Blob;
  convertedSize?: number;
  convertedWidth?: number;
  convertedHeight?: number;
  targetFormat: 'png' | 'jpeg' | 'webp';
  targetWidth?: number;
  targetHeight?: number;
  targetQuality: number; // 0 to 1
}

export type ActiveTab = 'converter' | 'resizer' | 'compressor' | 'blog' | 'insights';

export interface SeoKeyword {
  keyword: string;
  volume: string;
  difficulty: 'Low' | 'Medium' | 'High';
  cpc: string;
  intent: 'Informational' | 'Transactional' | 'Commercial';
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  readTime: string;
  keywords: string[];
  category: string;
  publishedDate: string;
  author: string;
}
