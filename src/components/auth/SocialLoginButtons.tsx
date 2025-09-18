import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { Twitter, GitHub } from '@mui/icons-material';
import { SocialButton } from '@/styles/authStyles';
import GoogleLoginButton from '@/components/GoogleLoginButton';

interface SocialLoginSectionProps {
  onSocialLogin: (provider: 'google' | 'twitter' | 'discord') => void;
  disabled?: boolean;
  variant?: 'login' | 'signup';
  showGoogle?: boolean;
  showTwitter?: boolean;
  showDiscord?: boolean;
}

export const SocialLoginSection: React.FC<SocialLoginSectionProps> = ({
  onSocialLogin,
  disabled = false,
  variant = 'login',
  showGoogle = true,
  showTwitter = true,
  showDiscord = true
}) => {
  const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );

  const TwitterIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path fill="currentColor" d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"/>
    </svg>
  );

  const DiscordIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path fill="currentColor" d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
    </svg>
  );

  const renderDivider = () => {
    if (variant === 'signup') {
      return (
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'rgba(255, 255, 255, 0.5)', 
            textAlign: 'center',
            mb: 2
          }}
        >
          Or
        </Typography>
      );
    }

    return (
      <Divider sx={{ mb: 3, bgcolor: 'divider' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', px: 2 }}>
          Or
        </Typography>
      </Divider>
    );
  };

  const renderSocialButtons = () => {
    if (variant === 'login') {
      return (
        <>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            {showGoogle && <GoogleLoginButton disabled={disabled} />}
            
            {showTwitter && (
              <SocialButton 
                onClick={() => onSocialLogin('twitter')} 
                disabled={disabled}
              >
                <Twitter />
              </SocialButton>
            )}
            
            {showDiscord && (
              <SocialButton 
                onClick={() => onSocialLogin('discord')} 
                disabled={disabled}
              >
                <GitHub />
              </SocialButton>
            )}
          </Box>

          {showGoogle && (
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <GoogleLoginButton variant="button" disabled={disabled} />
            </Box>
          )}
        </>
      );
    }

    // Signup variant
    return (
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        {showGoogle && (
          <SocialButton onClick={() => onSocialLogin('google')}>
            <GoogleIcon />
          </SocialButton>
        )}

        {showTwitter && (
          <SocialButton onClick={() => onSocialLogin('twitter')}>
            <TwitterIcon />
          </SocialButton>
        )}

        {showDiscord && (
          <SocialButton onClick={() => onSocialLogin('discord')}>
            <DiscordIcon />
          </SocialButton>
        )}
      </Box>
    );
  };

  return (
    <>
      {renderDivider()}
      {renderSocialButtons()}
    </>
  );
};