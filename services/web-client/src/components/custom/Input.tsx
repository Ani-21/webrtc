import { Input, styled } from '@mui/material';

interface CustomInputProps {
  myheight: 'big' | 'small';
  isfocused?: 'true';
  myColor?: 'dark';
}

export const CustomInput = styled(Input)(({ myheight, isfocused, myColor }: CustomInputProps) => ({
  backgroundColor: myColor === 'dark' ? '#181b1d' : '#2A2E30',
  borderRadius: '11px',
  height: myheight === 'big' ? '52px' : '50px',
  padding: '14px 12px',
  fontWeight: '300',
  fontSize: '16px',
  lineHeight: '24px',
  caretColor: '#2C68FA',
  width: '100%',
  '&.Mui-focused': {
    border: isfocused ? '1px solid #2C68FA' : 'none',
  },
  '&:hover': {
    border: isfocused ? '1px solid #2C68FA' : '1px solid rgba(255, 255, 255, 0.25)',
    cursor: 'pointer',
  },
  '.MuiInputBase-input': {
    color: 'white',
    '&::placeholder': {
      color: 'white',
    },
  },
}));
