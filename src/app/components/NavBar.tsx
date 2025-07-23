import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      className="bg-gray-800"
    >
      <Toolbar className="flex justify-between items-center w-full">
        <div>
          <Typography variant="h6" className="text-white">
            PackDraw
          </Typography>
        </div>

        <div className="flex space-x-4 mx-auto">
          <Button color="inherit">Packs</Button>
          <Button color="inherit">Battles</Button>
          <Button color="inherit">Deals</Button>
          <Button color="inherit">Draw</Button>
          <Button color="inherit">Events</Button>
          <Button color="inherit">Rewards</Button>
          <Button color="inherit">Sign In</Button>
          <Button variant="contained" color="primary">
            Register
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
