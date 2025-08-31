import { Typography, Box } from "@mui/material";

const Dashboard = () => {
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      height="100vh"
    >
      <Typography variant="h1" component="h2">
        This is dashboard page
      </Typography>
    </Box>
  );
};

export default Dashboard;
