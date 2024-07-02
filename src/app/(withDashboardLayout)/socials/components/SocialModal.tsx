"use client";
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import GBInput from '@/components/Forms/GBInput';
import GBForm from '@/components/Forms/GBForm';
import GBModal from '@/components/GBModal/GBModal';
import { useUpdateSocialMutation } from '@/redux/api/socialAPi';

const validationSchema = z.object({
  name: z.string().optional(),
  link: z.string().optional(),
});

const SocialModal = ({ open, setOpen, social, isSuccess }: any) => {
  const [defaultValues, setDefaultValues] = useState<FieldValues>({});
  const [updateSocial] = useUpdateSocialMutation(); 

  useEffect(() => {
    if (isSuccess && social) {
      setDefaultValues(social);
    }
  }, [isSuccess, social]);

  const submitHandler = async (values: FieldValues) => {
    try {
      await updateSocial({ ...values, id: social._id }).unwrap(); 
      setOpen(false);
    } catch (error) {
      console.error('Failed to update social profile', error);
    }
  };

  return (
    <GBModal open={open} setOpen={setOpen} title="Edit Social Profile">
      <GBForm
        onSubmit={submitHandler}
        resolver={zodResolver(validationSchema)}
        defaultValues={defaultValues}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <GBInput name="name" label="Name" fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <GBInput name="link" label="Link" fullWidth required />
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

export default SocialModal;
