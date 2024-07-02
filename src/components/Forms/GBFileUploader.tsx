import * as React from "react";
import { SxProps, styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@mui/material";

type TProps = {
  name: string;
  label?: string;
  sx?: SxProps;
};

export default function GBFileUploader({ name, label, sx }: TProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({field : {onChange,value,...field}}) => {
        return (
          <Button
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{ ...sx,
              borderColor: "#465775",
              color: "#465775",
              "&:hover": {
                color: "#465775",
                borderColor: "#465775",

              },
             }}
          >
            {label || "Upload File"}
            <Input {...field} type={name} value={value?.fileName}
            //1st onChange for input & 2nd onChange coming from render field prop
            onChange={(e)=> onChange((e?.target as HTMLInputElement).files?.[0])}
            style={{display : "none"}}
            />
          </Button>
        );
      }}
    />
  );
}
