"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Pagination,
  CircularProgress,
  Alert,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import GridViewIcon from '@mui/icons-material/GridView';
import { BoxCard } from './BoxCard';
import { BoxFilters, Box as BoxType } from '@/types/featuresbox/box';
import { useBoxes } from '@/hooks/featuresbox/usefeaturesbox';

type CategoryType = 'trending' | 'official' | 'creator' | 'discounts' | '';

export const BoxesPage: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState<string>('newest');
  const [category, setCategory] = useState<CategoryType>('');

  const { boxes, loading, error, totalPages, currentPage, fetchBoxes } =
    useBoxes({ page: 1, pageSize: 12 });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    fetchBoxes({ search: value, page: 1 });
  };

  const handlePriceFilterChange = (event: any) => {
    const value = event.target.value;
    setPriceFilter(value);
    
    const filters: BoxFilters = { page: 1 };
    if (value === 'low-to-high' || value === 'high-to-low') {
      filters.priceRange = value;
    }
    fetchBoxes(filters);
  };

  const handleCategoryChange = (
    event: React.MouseEvent<HTMLElement>,
    newCategory: CategoryType
  ) => {
    if (newCategory !== null) {
      setCategory(newCategory);
      fetchBoxes({ category: newCategory || undefined, page: 1 });
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    fetchBoxes({ page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBoxClick = (box: BoxType) => {
    router.push(`/box/${box.id}`);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Stack spacing={3} sx={{ mb: 4 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          justifyContent="space-between"
          spacing={2}
        >
          <Typography
            variant="h4"
            sx={{
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: { xs: '1.75rem', md: '2rem' },
            }}
          >
            Search Boxes & Games
          </Typography>
        </Stack>

        {/* Filters */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          sx={{ width: '100%' }}
        >
          {/* Search */}
          <TextField
            fullWidth
            placeholder="Search boxes..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#8E9AAB' }} />
                </InputAdornment>
              ),
              sx: {
                bgcolor: 'rgba(26, 35, 50, 0.6)',
                border: '1px solid rgba(58, 190, 249, 0.2)',
                borderRadius: 2,
                color: '#FFFFFF',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '&:hover': {
                  border: '1px solid rgba(58, 190, 249, 0.4)',
                },
                '&.Mui-focused': {
                  border: '1px solid rgba(58, 190, 249, 0.6)',
                },
              },
            }}
            sx={{ flex: 1 }}
          />

          {/* Sort By */}
          <FormControl sx={{ minWidth: { xs: '100%', md: 200 } }}>
            <InputLabel
              sx={{
                color: '#8E9AAB',
                '&.Mui-focused': { color: '#3ABEF9' },
              }}
            >
              Sort By
            </InputLabel>
            <Select
              value={priceFilter}
              label="Sort By"
              onChange={handlePriceFilterChange}
              sx={{
                bgcolor: 'rgba(26, 35, 50, 0.6)',
                border: '1px solid rgba(58, 190, 249, 0.2)',
                borderRadius: 2,
                color: '#FFFFFF',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '&:hover': {
                  border: '1px solid rgba(58, 190, 249, 0.4)',
                },
                '&.Mui-focused': {
                  border: '1px solid rgba(58, 190, 249, 0.6)',
                },
                '& .MuiSvgIcon-root': {
                  color: '#8E9AAB',
                },
              }}
            >
              <MenuItem value="newest">Newest</MenuItem>
              <MenuItem value="low-to-high">Price: Low to High</MenuItem>
              <MenuItem value="high-to-low">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {/* Category Toggles */}
        <Box sx={{ width: '100%', overflowX: 'auto' }}>
          <ToggleButtonGroup
            value={category}
            exclusive
            onChange={handleCategoryChange}
            sx={{
              display: 'flex',
              flexWrap: isMobile ? 'nowrap' : 'wrap',
              gap: 1,
              '& .MuiToggleButton-root': {
                flex: isMobile ? '0 0 auto' : 'initial',
                minWidth: isMobile ? 120 : 'auto',
                bgcolor: 'rgba(26, 35, 50, 0.6)',
                border: '1px solid rgba(58, 190, 249, 0.2)',
                borderRadius: '8px !important',
                color: '#8E9AAB',
                textTransform: 'none',
                fontWeight: 500,
                px: 3,
                py: 1,
                '&:hover': {
                  bgcolor: 'rgba(58, 190, 249, 0.1)',
                  border: '1px solid rgba(58, 190, 249, 0.4)',
                },
                '&.Mui-selected': {
                  bgcolor: 'rgba(58, 190, 249, 0.2)',
                  border: '1px solid rgba(58, 190, 249, 0.6)',
                  color: '#3ABEF9',
                  '&:hover': {
                    bgcolor: 'rgba(58, 190, 249, 0.25)',
                  },
                },
              },
            }}
          >
            <ToggleButton value="">
              <GridViewIcon sx={{ mr: 1, fontSize: 18 }} />
              All
            </ToggleButton>
            <ToggleButton value="trending">Trending</ToggleButton>
            <ToggleButton value="official">Official</ToggleButton>
            <ToggleButton value="creator">Creator</ToggleButton>
            <ToggleButton value="discounts">Discounts</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Stack>

      {/* Loading State */}
      {loading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 400,
          }}
        >
          <CircularProgress sx={{ color: '#3ABEF9' }} />
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error.message}
        </Alert>
      )}

      {/* Boxes Grid */}
      {!loading && !error && (
        <>
          {/* Boxes Grid using CSS Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(4, 1fr)',
                lg: 'repeat(5, 1fr)',
              },
              gap: { xs: 2, md: 2.5 },
            }}
          >
            {boxes.map((box) => (
              <BoxCard key={box.id} box={box} onClick={handleBoxClick} />
            ))}
          </Box>

          {/* Empty State */}
          {boxes.length === 0 && (
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
              }}
            >
              <Typography variant="h6" sx={{ color: '#8E9AAB', mb: 1 }}>
                No boxes found
              </Typography>
              <Typography variant="body2" sx={{ color: '#8E9AAB' }}>
                Try adjusting your search or filters
              </Typography>
            </Box>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Stack alignItems="center" sx={{ mt: 6 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                size={isMobile ? 'small' : 'medium'}
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: '#8E9AAB',
                    border: '1px solid rgba(58, 190, 249, 0.2)',
                    bgcolor: 'rgba(26, 35, 50, 0.6)',
                    '&:hover': {
                      bgcolor: 'rgba(58, 190, 249, 0.1)',
                      border: '1px solid rgba(58, 190, 249, 0.4)',
                    },
                    '&.Mui-selected': {
                      bgcolor: '#3ABEF9',
                      color: '#FFFFFF',
                      border: '1px solid #3ABEF9',
                      '&:hover': {
                        bgcolor: '#2DA8D8',
                      },
                    },
                  },
                }}
              />
            </Stack>
          )}
        </>
      )}
    </Container>
  );
};