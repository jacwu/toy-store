export interface Comment {
  id: number;
  toyId: number;
  author: string;
  content: string;
  rating: number; // 1-5 stars
  createdAt: Date;
}

export interface CreateCommentRequest {
  author: string;
  content: string;
  rating: number;
}

export interface UpdateCommentRequest {
  author?: string;
  content?: string;
  rating?: number;
}