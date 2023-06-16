import { Input, styled } from '@mui/material';

interface CustomInputProps {
  myHeight: 'big' | 'small';
  isFocused?: 'true';
  myColor?: 'dark';
}

export const CustomInput = styled(Input)(({ myHeight, isFocused, myColor }: CustomInputProps) => ({
  backgroundColor: myColor === 'dark' ? '#181b1d' : '#2A2E30',
  borderRadius: '11px',
  height: myHeight === 'big' ? '52px' : '50px',
  padding: '14px 12px',
  fontWeight: '300',
  fontSize: '16px',
  lineHeight: '24px',
  caretColor: '#2C68FA',
  width: '100%',
  '&.Mui-focused': {
    border: isFocused ? '1px solid #2C68FA' : 'none',
  },
  '&:hover': {
    border: '1px solid rgba(255, 255, 255, 0.25)',
    cursor: 'pointer',
  },
  '.MuiInputBase-input': {
    color: 'white',
    '&::placeholder': {
      color: 'white',
    },
  },
}));
