import { styled } from '@mui/material/styles';
import { Box, Paper, Button, TextField } from '@mui/material';
import leftSideImage from "../../public/image/leftsideImage.png";
import geometricBackground from "../../public/image/bgimage.png";

export const AuthContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
 backgroundImage: `url(${geometricBackground.src})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

export const FormContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  maxWidth: 900,
  height: 600,
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
}));


export const LeftPanel = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundImage: `url(${leftSideImage.src})`,
  backgroundSize: 'cover',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between', 
  color: 'white',
  position: 'relative',
  padding: theme.spacing(6, 6, 0, 6),
}));

export const RightPanel = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: '#242A3A',
  padding: theme.spacing(6),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

export const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  zIndex: 1,
  '& img': {
    maxWidth: '100%', 
    height: 'auto',
  },
}));


export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6366f1',
    },
    '& input': {
      color: 'white',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-focused': {
      color: '#6366f1',
    },
  },
}));

export const SocialButton = styled(Button)(({ theme }) => ({
  minWidth: 50,
  height: 50,
  borderRadius: 8,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: 24,
  },
}));