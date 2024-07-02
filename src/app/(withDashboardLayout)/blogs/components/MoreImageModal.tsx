
"use client"
import React from 'react';
import { Box, Button, Grid } from '@mui/material';
import { FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import GBForm from '@/components/Forms/GBForm'; 
import GBModal from '@/components/GBModal/GBModal'; 
import GBFileUploader from '@/components/Forms/GBFileUploader'; 
import uploadToImgBB from '@/utils/uploadToImgBB'; 
import { useUpdateBlogsMutation } from '@/redux/api/blogApi';

const validationSchema = z.object({
  images: z.array(z.string()).optional(),
});

const MoreImageModal = ({ open, setOpen, blog }: any) => {
  const [updateBlog] = useUpdateBlogsMutation(); 

  const submitHandler = async (values: FieldValues) => {
    try {
      const formattedValues = {
        images: values.images,
      };

      // Update blog with additional images
      await updateBlog({ data: formattedValues, id: blog?._id }).unwrap();

      setOpen(false);
    } catch (error) {
      console.error('Failed to add images to blog', error);
    }
  };

  return (
    <GBModal open={open} setOpen={setOpen} title="Add Images to Blog Post">
      <GBForm
        onSubmit={submitHandler}
        resolver={zodResolver(validationSchema)}
        defaultValues={{ images: [] }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <GBFileUploader name="images" label="Upload Images" />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
      </GBForm>
    </GBModal>
  );
};

export default MoreImageModal;
