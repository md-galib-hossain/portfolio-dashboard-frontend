"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import GBInput from "@/components/Forms/GBInput";
import GBSelectField from "@/components/Forms/GBSelectField";
import GBForm from "@/components/Forms/GBForm";
import {
  useUpdateSkillMutation,
} from "@/redux/api/skillApi";
import GBModal from "@/components/GBModal/GBModal";
import GBFileUploader from "@/components/Forms/GBFileUploader";
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
  const [updateSkill] = useUpdateSkillMutation();

  useEffect(() => {
    if (isSuccess && skill) {
      setDefaultValues(skill);
    }
  }, [isSuccess, skill]);

  const submitHandler = async (values: FieldValues) => {
    console.log(values)
  
    try {
        if (values.file) {
            const icon = await uploadToImgBB(values.file);
            delete values.file;
            values.icon = icon;
          }
      await updateSkill({ ...values, id: skill._id }).unwrap();
      setOpen(false);
    } catch (error) {
      console.error("Failed to update skill", error);
    }
  };

  const levels = [
    { id: "beginner", name: "Beginner" },
    { id: "intermediate", name: "Intermediate" },
    { id: "advanced", name: "Advanced" },
  ];

  const categories = [
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "tools", name: "Tools" },
  ];

  const priorities = [
    { id: "low", name: "Low" },
    { id: "medium", name: "Medium" },
    { id: "high", name: "High" },
  ];

  return (
    <GBModal open={open} setOpen={setOpen} title="Edit Skill">
      {Object.keys(defaultValues).length === 0 ? (
        <p>Loading...</p>
      ) : (
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
      )}
    </GBModal>
  );
};

export default SkillModal;
