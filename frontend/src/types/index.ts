export interface ToyType {
  id: number;
  name: string;
  description: string;
  icon?: string;
}

export interface Toy {
  id: number;
  name: string;
  description: string;
  detailDescription?: string;
  price: number;
  toyTypeId: number;
  toyType?: ToyType;
}

export interface CreateToyRequest {
  name: string;
  description: string;
  price: number;
  toyTypeId: number;
}

export interface UpdateToyRequest {
  name?: string;
  description?: string;
  price?: number;
  toyTypeId?: number;
}
