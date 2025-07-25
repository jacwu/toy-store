export interface ToyType {
  id: number;
  name: string;
  description: string;
  icon?: string | undefined;
}

export interface CreateToyTypeRequest {
  name: string;
  description: string;
  icon?: string | undefined;
}

export interface UpdateToyTypeRequest {
  name?: string;
  description?: string;
  icon?: string | undefined;
}
