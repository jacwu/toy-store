export interface Feedback {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

export interface CreateFeedbackRequest {
  name: string;
  email: string;
  message: string;
}