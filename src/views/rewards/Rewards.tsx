import React, { useState } from 'react';
import { Box, Typography, Container, Grid, CircularProgress, Alert, Snackbar } from '@mui/material';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { RewardCard } from './RewardCard';
import { useRewards } from '@/hooks/rewards/useRewards';
import { Reward } from '@/types/rewards/rewards.types';


export const Rewards: React.FC = () => {
  const { rewards, isLoading, error, claimReward } = useRewards();
  const [claimingId, setClaimingId] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleClaimReward = async (rewardId: string): Promise<void> => {
    try {
      setClaimingId(rewardId);
      await claimReward(rewardId);
      
      setSnackbar({
        open: true,
        message: 'Reward claimed successfully!',
        severity: 'success',
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err instanceof Error ? err.message : 'Failed to claim reward',
        severity: 'error',
      });
    } finally {
      setClaimingId(null);
    }
  };

  const handleCloseSnackbar = (): void => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
        }}
      >
        <CircularProgress size={60} sx={{ color: '#06B6D4' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ borderRadius: '8px' }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #111827 0%, #000000 100%)',
        padding: '40px 0',
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            marginBottom: '40px',
          }}
        >
          <CardGiftcardIcon
            sx={{
              fontSize: 48,
              color: '#06B6D4',
            }}
          />
          <Typography
            variant="h3"
            sx={{
              color: '#fff',
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            Rewards
          </Typography>
        </Box>

        {/* Rewards Grid */}
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {rewards.map((reward: Reward) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={reward.id}>
              <RewardCard
                reward={reward}
                onClaim={handleClaimReward}
                isClaimingDisabled={claimingId !== null}
              />
            </Grid>
          ))}
        </Grid>

        {/* Empty State */}
        {rewards.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" sx={{ color: '#9CA3AF' }}>
              No rewards available at the moment
            </Typography>
          </Box>
        )}
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};