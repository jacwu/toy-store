export interface Message {
  id: number;
  title: string;
  content: string;
  userId: number;
  username: string;
  createdAt: Date;
}

export interface CreateMessageRequest {
  title: string;
  content: string;
  userId: number;
}

export interface MessageListResponse {
  messages: Message[];
  total: number;
}