import { AppBar, Toolbar, Typography } from '@mui/material';

  const Header: React.FC = () => {
    return (
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
            Lottery App
          </Typography>
        </Toolbar>
      </AppBar>
    );
  };

  export default Header;