import React from "react";
import { TextField } from "@mui/material";

const InputField = ({
  label,
  value,
  onChange,
  type = "text",
  required = true,
  autoComplete,
  ...props
}) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      value={value}
      onChange={onChange}
      type={type}
      required={required}
      autoComplete={autoComplete}
      {...props}
    />
  );
};

export default InputField;
