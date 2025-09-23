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
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(2),
  
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1),
  },
}));

export const FormContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  // width: '100%',
  // maxWidth: 900,
  // height: 600,
  borderRadius: 8,
  overflow: 'hidden',
  boxShadow: theme.palette.mode === 'dark' 
    ? '0 20px 60px rgba(0, 0, 0, 0.5)' 
    : '0 20px 60px rgba(0, 0, 0, 0.15)',
  
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    height: 'auto',
    minHeight: '100vh',
    maxWidth: '100%',
    borderRadius: 0,
  },
  
  [theme.breakpoints.down('sm')]: {
    margin: 0,
  },
}));

export const LeftPanel = styled(Box)(({ theme }) => ({
  flex: 1,
  // backgroundImage: `url(${leftSideImage.src})`,
  // backgroundSize: 'cover',
  // backgroundPosition: 'center',
  backgroundColor: '#0B0F14',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: 'white',
  position: 'relative',

  padding: '32px',
  paddingBottom: 0,
  minHeight: 300,
  
  [theme.breakpoints.down('md')]: {
    flex: '0 0 auto',
    minHeight: 200,
    padding: theme.spacing(4, 2),
  },
  
  [theme.breakpoints.down('sm')]: {
    minHeight: 150,
    padding: theme.spacing(3, 2),
  },
}));

export const RightPanel = styled(Box)(({ theme }) => ({
  // flex: 1,
  backgroundColor: theme.custom?.auth?.rightPanelBg || '#242A3A',
  // padding: theme.spacing(2),
  padding: '32px',
  // display: 'flex',
  // flexDirection: 'column',
  // justifyContent: 'center',
  
  [theme.breakpoints.down('md')]: {
    flex: 1,
    padding: theme.spacing(4, 3),
    justifyContent: 'flex-start',
    paddingTop: theme.spacing(4),
  },
  
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3, 2),
    paddingTop: theme.spacing(4),
  },
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
    width: 200,
    
    [theme.breakpoints.down('md')]: {
      width: 150,
    },
    
    [theme.breakpoints.down('sm')]: {
      width: 120,
    },
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: '10px',
  
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.custom?.auth?.inputBg || 'rgba(255, 255, 255, 0.05)',
    borderRadius: 3,
    
    '& fieldset': {
      borderColor: theme.custom?.auth?.inputBorder || 'rgba(255, 255, 255, 0.2)',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.mode === 'dark' 
        ? 'rgba(255, 255, 255, 0.3)' 
        : 'rgba(0, 0, 0, 0.3)',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '& input': {
      color: theme.palette.text.primary,
      fontSize: '1rem',
      
      [theme.breakpoints.down('sm')]: {
        fontSize: '16px', // Prevents zoom on iOS
      },
    },
  },
  
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
    '&.Mui-focused': {
      color: theme.palette.primary.main,
    },
  },
  
  '& .MuiFormHelperText-root': {
    color: theme.palette.error.main,
  },
}));

export const SocialButton = styled(Button)(({ theme }) => ({
  minWidth: 50,
  height: 50,
  borderRadius: 3,
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(0, 0, 0, 0.05)',
  border: `1px solid ${theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.2)' 
    : 'rgba(0, 0, 0, 0.1)'}`,
  color: theme.palette.text.primary,
  
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.15)' 
      : 'rgba(0, 0, 0, 0.1)',
  },
  
  '& .MuiSvgIcon-root': {
    fontSize: 24,
    
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    },
  },
  
  [theme.breakpoints.down('sm')]: {
    minWidth: 45,
    height: 45,
  },
}));

export const PrimaryButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  backgroundColor: '#3ABEF9',
  color: ' #101004',
  fontWeight: 400,
  textTransform: 'none',
  borderRadius: 8,
  fontSize: '1rem',
  marginBottom: '24px',
  
  // '&:hover': {
  //   backgroundColor: theme.palette.primary.dark,
  // },
  
  '&:disabled': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(0, 0, 0, 0.1)',
    color: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.3)' 
      : 'rgba(0, 0, 0, 0.3)',
  },
  
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.2, 2),
    fontSize: '0.95rem',
  },
}));