import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { Reward, RewardStatus } from '@/types/rewards/rewards.types';

interface RewardCardProps {
  reward: Reward;
  onClaim: (rewardId: string) => void;
  isClaimingDisabled?: boolean;
}

export const RewardCard: React.FC<RewardCardProps> = ({
  reward,
  onClaim,
  isClaimingDisabled = false,
}) => {
  const isClaimed = reward.status === RewardStatus.CLAIMED;
  const isLocked = reward.status === RewardStatus.LOCKED;

  const handleClaim = () => {
    if (!isClaimed && !isLocked && !isClaimingDisabled) {
      onClaim(reward.id);
    }
  };

  return (
    <Card
      sx={{
        background: reward.gradientColors,
        borderRadius: '12px',
        border: '2px solid rgba(55, 65, 81, 0.5)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          border: '2px solid #06B6D4',
          boxShadow: '0 10px 30px rgba(6, 182, 212, 0.3)',
        },
      }}
    >
      {/* Gift Box Image */}
      <Box
        sx={{
          position: 'relative',
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }}
      >
        <Box
          component="img"
          src={reward.imageUrl}
          alt={reward.title}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5))',
          }}
         
        />

        {isClaimed && (
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              backgroundColor: '#10B981',
              color: '#fff',
              padding: '4px 12px',
              borderRadius: '16px',
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
            Claimed
          </Box>
        )}

        {isLocked && (
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              backgroundColor: '#4B5563',
              color: '#fff',
              padding: '4px 12px',
              borderRadius: '16px',
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
            Locked
          </Box>
        )}
      </Box>

      {/* Card Content */}
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
          paddingTop: 0,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: '#fff',
            fontWeight: 700,
            fontSize: '24px',
            marginBottom: '12px',
            textAlign: 'center',
          }}
        >
          {reward.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: '14px',
            lineHeight: 1.6,
            marginBottom: '20px',
            textAlign: 'center',
            flexGrow: 1,
          }}
        >
          {reward.description}
        </Typography>

        {/* Claim Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleClaim}
          disabled={isClaimed || isLocked || isClaimingDisabled}
          sx={{
            backgroundColor: '#06B6D4',
            color: '#fff',
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: '8px',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: '#0891B2',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 20px rgba(6, 182, 212, 0.5)',
            },
            '&:disabled': {
              backgroundColor: '#374151',
              color: '#6B7280',
            },
          }}
        >
          {isClaimed ? 'Claimed' : isLocked ? 'Locked' : 'Claim Your Rewards'}
        </Button>
      </CardContent>
    </Card>
  );
};