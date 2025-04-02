import { SxProps, Theme } from '@mui/material';

export const containerStyle: SxProps<Theme> = {
  maxWidth: 'lg',
  mx: 'auto',
  py: 4,
  px: { xs: 2, sm: 3 },
};

export const typographyHeaderStyle: SxProps<Theme> = {
  mb: 3,
  fontWeight: 'bold',
  color: 'text.primary',
  borderBottom: '2px solid',
  borderColor: 'primary.main',
  pb: 1,
  display: 'inline-block',
};

export const cardStyle: SxProps<Theme> = {
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 3,
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: 6,
  },
};

// Add button styles for consistency
export const buttonStyle: SxProps<Theme> = {
  borderRadius: 1,
  textTransform: 'none',
  px: 3,
  py: 1,
  fontWeight: 'medium',
};

// Add input field styles
export const inputStyle: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 1,
    '&:hover fieldset': {
      borderColor: 'primary.main',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'primary.main',
    },
  },
};