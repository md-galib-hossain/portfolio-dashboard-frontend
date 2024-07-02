"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import GBInput from "@/components/Forms/GBInput";
import GBForm from "@/components/Forms/GBForm";
import GBModal from "@/components/GBModal/GBModal";
import { useCreateEducationsMutation, useUpdateEducationsMutation } from "@/redux/api/educationApi";

const validationSchema = z.object({
  institutionName: z.string().optional(),
  admitYear: z.string().optional(),
  passingYear: z.string().optional(),
  result: z.string().optional(),
  department: z.string().optional(),
  degreeName: z.string().optional(),
  location: z.string().optional(),
});

const EducationModal = ({ open, setOpen, education, isSuccess }: any) => {
  const [defaultValues, setDefaultValues] = useState<FieldValues>({});
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [updateEducation] = useUpdateEducationsMutation();
  const [createEducation] = useCreateEducationsMutation();

  useEffect(() => {
    if (isSuccess && education) {
      setDefaultValues(education);
    } else {
      setDefaultValues({
        institutionName: '',
        admitYear: '',
        passingYear: '',
        result: '',
        department: '',
        degreeName: '',
        location: '',
      });
    }
    setIsCreating(!education);
  }, [isSuccess, education]);

  const submitHandler = async (values: FieldValues) => {
    try {
      if (isCreating) {
        await createEducation(values).unwrap();
      } else {
        await updateEducation({ ...values, id: education._id }).unwrap();
      }
      setOpen(false);
    } catch (error) {
      console.error("Failed to save education", error);
    }
  };

  return (
    <GBModal open={open} setOpen={setOpen} title={isCreating ? 'Create Education' : 'Edit Education'}>
      <GBForm
        onSubmit={submitHandler}
        resolver={zodResolver(validationSchema)}
        defaultValues={defaultValues}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <GBInput name="institutionName" label="Institution Name" fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <GBInput name="admitYear" label="Admit Year" fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <GBInput name="passingYear" label="Passing Year" fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <GBInput name="result" label="Result" fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <GBInput name="department" label="Department" fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <GBInput name="degreeName" label="Degree Name" fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <GBInput name="location" label="Location" fullWidth required />
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

export default EducationModal;
