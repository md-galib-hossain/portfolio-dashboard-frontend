"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import GBInput from "@/components/Forms/GBInput";
import GBSelectField from "@/components/Forms/GBSelectField";
import GBForm from "@/components/Forms/GBForm";
import GBModal from "@/components/GBModal/GBModal";
import GBFileUploader from "@/components/Forms/GBFileUploader";
import { useCreateSkillMutation, useUpdateSkillMutation } from "@/redux/api/skillApi";
import uploadToImgBB from "@/utils/uploadToImgBB";

const validationSchema = z.object({
  name: z.string().optional(),
  level: z.string().optional(),
  category: z.string().optional(),
  priority: z.string().optional(),
  icon: z.string().optional(),
  file: z.any().optional()
});

const SkillModal = ({ open, setOpen, skill, isSuccess }: any) => {
  const [defaultValues, setDefaultValues] = useState<FieldValues>({});
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [updateSkill] = useUpdateSkillMutation();
  const [createSkill] = useCreateSkillMutation();

  useEffect(() => {
    if (isSuccess && skill) {
      setDefaultValues(skill);
    } else {
      setDefaultValues({});
    }
    setIsCreating(!skill);
  }, [isSuccess, skill]);

  const submitHandler = async (values: FieldValues) => {
    try {
      if (isCreating) {
        if (values.file) {
          const icon = await uploadToImgBB(values.file);
          delete values.file;
          values.icon = icon;
        }
        await createSkill(values).unwrap();
      } else {
        if (values.file) {
          const icon = await uploadToImgBB(values.file);
          delete values.file;
          values.icon = icon;
        }
        await updateSkill({ ...values, id: skill._id }).unwrap();
      }
      setOpen(false);
    } catch (error) {
      console.error("Failed to save skill", error);
    }
  };

  const levels = [
    { id: "beginner", name: "Beginner" },
    { id: "intermediate", name: "Intermediate" },
    { id: "advanced", name: "Advanced" },
  ];

  const categories = [
    { id: "frontEnd", name: "Frontend" },
    { id: "backEnd", name: "Backend" },
    { id: "tools", name: "Tools" },
  ];

  const priorities = [
    { id: "low", name: "Low" },
    { id: "medium", name: "Medium" },
    { id: "high", name: "High" },
  ];

  return (
    <GBModal open={open} setOpen={setOpen} title={isCreating ? 'Create Skill' : 'Edit Skill'}>
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
            <GBSelectField
              name="level"
              label="Level"
              items={levels}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <GBSelectField
              name="category"
              label="Category"
              items={categories}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <GBSelectField
              name="priority"
              label="Priority"
              items={priorities}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <GBFileUploader name="file" label="Upload Icon Image" />
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

export default SkillModal;
