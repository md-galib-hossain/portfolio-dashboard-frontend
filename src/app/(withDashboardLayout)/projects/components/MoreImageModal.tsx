"use client";
import React from "react";
import { Box, Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import GBForm from "@/components/Forms/GBForm";
import GBModal from "@/components/GBModal/GBModal";
import GBFileUploader from "@/components/Forms/GBFileUploader";
import { useUpdateProjectMutation } from "@/redux/api/projectApi";
import uploadToImgBB from "@/utils/uploadToImgBB";

const validationSchema = z.object({
  file: z.any().optional(),
});

const MoreImageModal = ({ open, setOpen, project }: any) => {
  const [updateProject] = useUpdateProjectMutation();

  const submitHandler = async (values: FieldValues) => {
    try {
      if (values.file) {
        const icon = await uploadToImgBB(values.file);
        const updatedImages = project.images ? [...project.images, icon] : [icon];
        await updateProject({ id: project?._id, images: updatedImages }).unwrap();
      }
      setOpen(false);
    } catch (error) {
      console.error("Failed to upload", error);
    }
  };

  return (
    <GBModal
      open={open}
      setOpen={setOpen}
      title={"Add Image"}
    >
      <GBForm
        onSubmit={submitHandler}
        resolver={zodResolver(validationSchema)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <GBFileUploader name="file" label="Upload Image" />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Button type="submit" variant="contained" color="primary">
                Upload
              </Button>
            </Box>
          </Grid>
        </Grid>
      </GBForm>
    </GBModal>
  );
};

export default MoreImageModal;
