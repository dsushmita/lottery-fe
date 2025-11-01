export interface Box {
  id: string;
  name: string;
  price: number;
  image: string;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  description?: string;
  isFeatured?: boolean;
}

export interface BoxesResponse {
  boxes: Box[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface BoxFilters {
  page?: number;
  pageSize?: number;
  priceRange?: 'low-to-high' | 'high-to-low';
  category?: 'trending' | 'official' | 'creator' | 'discounts';
  search?: string;
}

export interface UseBoxesReturn {
  boxes: Box[];
  loading: boolean;
  error: Error | null;
  totalPages: number;
  currentPage: number;
  fetchBoxes: (filters?: BoxFilters) => Promise<void>;
  refetch: () => Promise<void>;
}