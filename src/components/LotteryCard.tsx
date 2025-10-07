import { Box, Typography, Button } from "@mui/material";

interface LotteryCardProps {
  lottery: {
    title: string;
    description: string;
    prize: string;
    drawDate: string;
  };
}

export default function LotteryCard({ lottery }: LotteryCardProps) {
  return (
    <Box className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6 transition-transform hover:scale-105">
      <Typography variant="h6" className="text-center text-gray-800 mb-4">
        {lottery.title}
      </Typography>
      <Typography variant="body2" className="text-gray-600 mb-4">
        {lottery.description}
      </Typography>
      <Typography variant="h5" className="text-center text-lotteryPrimary mb-4">
        Prize: {lottery.prize}
      </Typography>
      <Typography variant="body2" className="text-center text-gray-500 mb-4">
        Draw: {lottery.drawDate}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className="w-full bg-lotteryPrimary hover:bg-blue-700"
      >
        Buy Ticket
      </Button>
    </Box>
  );
}
