import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Button,
  CircularProgress,
  Alert,
  Container,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useLeaderboard } from '@/hooks/Leaderboard/useLeaderboard';
import { LeaderboardPlayer } from '@/types/leaderboard/leaderboard.types';


interface LeaderboardProps {
  limit?: number;
  showViewAll?: boolean;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ 
  limit = 10,
  showViewAll = true 
}) => {
  const { players, isLoading, error } = useLeaderboard(limit);

  const handleViewAll = () => {
    console.log('View all leaderboard clicked');
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px', backgroundColor: '#0a0a0a' }}>
        <CircularProgress size={60} sx={{ color: '#06B6D4' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4, backgroundColor: '#0a0a0a' }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#0a0a0a', padding: '40px 20px', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <EmojiEventsIcon sx={{ fontSize: 32, color: '#06B6D4' }} />
            <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '24px' }}>Leaderboards</Typography>
          </Box>
          {showViewAll && (
            <Button variant="outlined" onClick={handleViewAll} sx={{ borderColor: '#2a2a2a', color: '#fff', textTransform: 'none', padding: '6px 20px', fontSize: '14px', fontWeight: 500, borderRadius: '6px', '&:hover': { borderColor: '#3a3a3a', backgroundColor: '#1a1a1a' } }}>
              View All
            </Button>
          )}
        </Box>

        <TableContainer sx={{ backgroundColor: '#1a1a1a', borderRadius: '12px', overflow: 'hidden' }}>
          <Table>
            <TableHead>
              <TableRow>
                {['#', 'Player', 'Points', 'Amount', 'Prize'].map((header) => (
                  <TableCell key={header} sx={{ color: '#6B7280', fontWeight: 500, fontSize: '13px', borderBottom: '1px solid #2a2a2a', padding: '12px 16px', width: header === '#' ? '50px' : 'auto', backgroundColor: '#0f0f0f' }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {players.map((player: LeaderboardPlayer, index: number) => (
                <TableRow key={player.id} sx={{ backgroundColor: player.rank === 1 ? 'rgba(180, 130, 50, 0.15)' : index % 2 === 0 ? '#1a1a1a' : '#232323', '&:hover': { backgroundColor: player.rank === 1 ? 'rgba(180, 130, 50, 0.2)' : 'rgba(6, 182, 212, 0.05)' } }}>
                  <TableCell sx={{ color: player.rank === 1 ? '#F59E0B' : '#9CA3AF', fontWeight: player.rank === 1 ? 700 : 500, fontSize: '14px', borderBottom: 'none', padding: '14px 16px' }}>
                    {player.rank}
                  </TableCell>
                  <TableCell sx={{ borderBottom: 'none', padding: '14px 16px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar src={player.playerAvatar} alt={player.playerName} sx={{ width: 32, height: 32, border: player.rank === 1 ? '2px solid #F59E0B' : 'none' }} />
                      <Typography sx={{ color: '#E5E7EB', fontWeight: 400, fontSize: '14px' }}>{player.playerName}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ borderBottom: 'none', padding: '14px 16px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: '#4B5563', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#E5E7EB' }} />
                      </Box>
                      <Typography sx={{ color: '#E5E7EB', fontWeight: 400, fontSize: '14px' }}>{player.points}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ borderBottom: 'none', padding: '14px 16px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography sx={{ color: '#000', fontSize: '10px', fontWeight: 700 }}>$</Typography>
                      </Box>
                      <Typography sx={{ color: '#E5E7EB', fontWeight: 400, fontSize: '14px' }}>{player.amount.toLocaleString()}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ borderBottom: 'none', padding: '14px 16px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 28, height: 28, borderRadius: '6px', backgroundColor: '#2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography sx={{ fontSize: '16px' }}>{player.prize.icon}</Typography>
                      </Box>
                      <Typography sx={{ color: '#E5E7EB', fontWeight: 400, fontSize: '14px' }}>{player.prize.name}</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};