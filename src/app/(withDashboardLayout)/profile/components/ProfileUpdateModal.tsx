import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Grid } from '@mui/material';
import { z } from 'zod';
import { FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetUserQuery, useUpdateUserMutation } from '@/redux/api/userApi';
import GBInput from '@/components/Forms/GBInput';
import GBForm from '@/components/Forms/GBForm';
import GBFullScreenModal from '@/components/GBModal/GBFullScreenModal';
import GBTextArea from '@/components/Forms/GBTextArea';
import GBFileUploader from '@/components/Forms/GBFileUploader';
import uploadToImgBB from '@/utils/uploadToImgBB';

const validationSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  role: z.string().optional(),
  headline: z.string().optional(),
  age: z.string().optional(),
  status: z.string().optional(),
  aboutMe: z.string().optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  resumeLinkId: z.string().optional(),
  file: z.any().optional(),
});

const ProfileUpdateModal = ({ open, setOpen, id }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>>; id: string; }) => {
  const { data, refetch, isLoading, isSuccess } = useGetUserQuery({});
  const [updateUser, { isLoading: updating }] = useUpdateUserMutation();
  const [defaultValues, setDefaultValues] = useState<FieldValues>({});
  
  useEffect(() => {
    if ( isSuccess) {

      setDefaultValues(data);
    }
  }, [isSuccess, data]);

  const submitHandler = async (values: FieldValues) => {
    try {
      if (values.file) {
        const userImage = await uploadToImgBB(values.file);
        delete values.file;
        values.userImage = userImage;
      }

      await updateUser({ ...values, id }).unwrap();
      setOpen(false);
      refetch();
    } catch (error) {
      console.error('Failed to update profile', error);
    }
  };

  return (
    <GBFullScreenModal open={open} setOpen={setOpen} title="Update Profile">
      <Container>
        <Box display="flex" justifyContent="center" mt={8} minHeight="100vh">
          <GBForm onSubmit={submitHandler} defaultValues={defaultValues} resolver={zodResolver(validationSchema)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <GBInput name="name" label="Name" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <GBInput name="email" label="Email" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <GBInput name="headline" label="Headline" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <GBInput name="age" label="Age" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <GBInput name="status" label="Status" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <GBInput name="resumeLinkId" label="Resume Link ID" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <GBTextArea name="aboutMe" label="About Me" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <GBInput name="presentAddress" label="Present Address" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <GBInput name="permanentAddress" label="Permanent Address" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <GBFileUploader name="file" label="Upload Profile Image" />
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button type="submit" disabled={updating}>
                Save
              </Button>
            </Box>
          </GBForm>
        </Box>
      </Container>
    </GBFullScreenModal>
  );
};

export default ProfileUpdateModal;
