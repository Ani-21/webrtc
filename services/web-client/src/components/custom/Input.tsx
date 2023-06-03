import { Input, styled } from "@mui/material";

export const CustomInput = styled(Input)((props) => ({
  backgroundColor: "#2A2E30",
  borderRadius: "11px",
  height: "52px",
  padding: "14px 12px",
  fontWeight: "300",
  fontSize: "16px",
  lineHeight: "24px",
  "&.Mui-focused": {
    border: "1px solid #2C68FA",
  },
  ".MuiInputBase-input": {
    color: "white",
    "&::placeholder": {
      color: "white",
    },
  },
}));
