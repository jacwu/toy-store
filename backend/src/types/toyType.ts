export interface ToyType {
  id: number;
  name: string;
  description: string;
  icon?: string;
}

export interface CreateToyTypeRequest {
  name: string;
  description: string;
  icon?: string;
}

export interface UpdateToyTypeRequest {
  name?: string;
  description?: string;
  icon?: string;
}
