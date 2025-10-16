import { boxService } from '@/services/featuresbox';
import { Box, BoxFilters, UseBoxesReturn } from '@/types/featuresbox/box';
import { useState, useEffect, useCallback } from 'react';

export const useBoxes = (initialFilters?: BoxFilters): UseBoxesReturn => {
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(initialFilters?.page || 1);
  const [filters, setFilters] = useState<BoxFilters>(initialFilters || {});

  const fetchBoxes = useCallback(async (newFilters?: BoxFilters) => {
    try {
      setLoading(true);
      setError(null);
      
      const mergedFilters = { ...filters, ...newFilters };
      setFilters(mergedFilters);
      
      const response = await boxService.getBoxes(mergedFilters);
      
      setBoxes(response.boxes);
      setTotalPages(response.totalPages);
      setCurrentPage(response.page);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      setBoxes([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const refetch = useCallback(() => {
    return fetchBoxes(filters);
  }, [fetchBoxes, filters]);

  useEffect(() => {
    fetchBoxes();
  }, []);

  return {
    boxes,
    loading,
    error,
    totalPages,
    currentPage,
    fetchBoxes,
    refetch,
  };
};

export const useFeaturedBoxes = () => {
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFeaturedBoxes = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await boxService.getFeaturedBoxes();
        setBoxes(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
        setBoxes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBoxes();
  }, []);

  return { boxes, loading, error };
};