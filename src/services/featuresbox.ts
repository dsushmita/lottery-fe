import { Box, BoxesResponse, BoxFilters } from "@/types/featuresbox/box";


// Mock data - Replace with actual API calls
const MOCK_BOXES: Box[] = [
  {
    id: '1',
    name: 'Secret Stash',
    price: 1400,
   image: '/image/featuresimage/featuresimage1.svg',

    rarity: 'rare',
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Hidden Vault',
    price: 1400,
    image: '/image/featuresimage/featuresimage2.svg',
    rarity: 'epic',
    isFeatured: true,
  },
  {
    id: '3',
    name: 'Unknown Crate',
    price: 1400,
    image: '/image/featuresimage/featuresimage3.svg',
    rarity: 'legendary',
    isFeatured: true,
  },
  {
    id: '4',
    name: 'Unknown Crate',
    price: 1400,
   image: '/image/featuresimage/featuresimage4.svg',
    rarity: 'common',
    isFeatured: true,
  },
  // Add more boxes for pagination
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `${i + 5}`,
    name: ['Secret Stash', 'Hidden Vault', 'Unknown Crate'][i % 3],
    price: 1400,
    image: `/images/boxes/box-${(i % 4) + 1}.png`,
    rarity: (['common', 'rare', 'epic', 'legendary'] as const)[i % 4],
    isFeatured: false,
  })),
];

class BoxService {
  private apiBaseUrl: string;

  constructor() {
    this.apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
  }

  /**
   * Fetch all boxes with optional filters
   */
  async getBoxes(filters?: BoxFilters): Promise<BoxesResponse> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${this.apiBaseUrl}/boxes?${new URLSearchParams(filters)}`);
      // const data = await response.json();
      // return data;

      // Mock implementation
      await this.simulateDelay();
      
      const page = filters?.page || 1;
      const pageSize = filters?.pageSize || 12;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      let filteredBoxes = [...MOCK_BOXES];

      // Apply search filter
      if (filters?.search) {
        filteredBoxes = filteredBoxes.filter(box =>
          box.name.toLowerCase().includes(filters.search!.toLowerCase())
        );
      }

      // Apply sorting
      if (filters?.priceRange === 'low-to-high') {
        filteredBoxes.sort((a, b) => a.price - b.price);
      } else if (filters?.priceRange === 'high-to-low') {
        filteredBoxes.sort((a, b) => b.price - a.price);
      }

      const paginatedBoxes = filteredBoxes.slice(startIndex, endIndex);
      const totalPages = Math.ceil(filteredBoxes.length / pageSize);

      return {
        boxes: paginatedBoxes,
        total: filteredBoxes.length,
        page,
        pageSize,
        totalPages,
      };
    } catch (error) {
      console.error('Error fetching boxes:', error);
      throw new Error('Failed to fetch boxes');
    }
  }

  /**
   * Fetch featured boxes
   */
  async getFeaturedBoxes(): Promise<Box[]> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${this.apiBaseUrl}/boxes/featured`);
      // const data = await response.json();
      // return data;

      // Mock implementation
      await this.simulateDelay();
      return MOCK_BOXES.filter(box => box.isFeatured).slice(0, 4);
    } catch (error) {
      console.error('Error fetching featured boxes:', error);
      throw new Error('Failed to fetch featured boxes');
    }
  }

  /**
   * Fetch a single box by ID
   */
  async getBoxById(id: string): Promise<Box | null> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${this.apiBaseUrl}/boxes/${id}`);
      // const data = await response.json();
      // return data;

      // Mock implementation
      await this.simulateDelay();
      return MOCK_BOXES.find(box => box.id === id) || null;
    } catch (error) {
      console.error('Error fetching box:', error);
      throw new Error('Failed to fetch box');
    }
  }

  /**
   * Simulate API delay for mock data
   */
  private simulateDelay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const boxService = new BoxService();