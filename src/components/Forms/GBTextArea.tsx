import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const GBTextArea = ({ name, label, rows = 4, ...props } : any) => {
  const { control } = useFormContext();
  
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          multiline
          rows={rows}
          variant="outlined"
          fullWidth
          {...props}
        />
      )}
    />
  );
};

export default GBTextArea;
