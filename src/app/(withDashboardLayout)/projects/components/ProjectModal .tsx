"use client";
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import GBInput from '@/components/Forms/GBInput';
import GBForm from '@/components/Forms/GBForm';
import GBModal from '@/components/GBModal/GBModal';
import { useCreateProjectMutation, useUpdateProjectMutation } from '@/redux/api/projectApi';
import uploadToImgBB from '@/utils/uploadToImgBB';
import GBFileUploader from '@/components/Forms/GBFileUploader';

const validationSchema = z.object({
  title: z.string().optional(),
  frontEnd: z.string().optional(),
  backEnd: z.string().optional(),
  liveLink: z.string().optional(),
  coverImage: z.string().optional(),
  heading: z.string().optional(),
  text: z.string().optional(),
  technologies: z.any().optional(),
  images: z.array(z.string()).optional(),
  file: z.any().optional(),
});

const ProjectModal = ({ open, setOpen, project, isSuccess }: any) => {
  const [defaultValues, setDefaultValues] = useState<FieldValues>({});
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [updateProject] = useUpdateProjectMutation(); 
  const [createProject] = useCreateProjectMutation(); 

  useEffect(() => {
    if (isSuccess && project) {
      setDefaultValues({
        title: project.title || '',
        frontEnd: project.links?.frontEnd || '',
        backEnd: project.links?.backEnd || '',
        liveLink: project.links?.liveLink || '',
        coverImage: project.coverImage || '',
        heading: project.description?.heading || '',
        text: project.description?.text || '',
        technologies: project.technologies ? project.technologies.join(', ') : '',
        images: project.images || [],
      });
    } else {
      setDefaultValues({
        title: '',
        frontEnd: '',
        backEnd: '',
        liveLink: '',
        coverImage: '',
        heading: '',
        text: '',
        technologies: '',
        images: [],
      });
    }
    setIsCreating(!project); 
  }, [isSuccess, project]);

  const submitHandler = async (values: FieldValues) => {
    try {
      // Split technologies string into an array if it's a string
      if (typeof values.technologies === 'string') {
        values.technologies = values.technologies.split(',').map((tech: string) => tech.trim());
      }
  
      let formattedValues: any = {};
  
      if (isCreating) {
        // For creating a new project
        
  let imgbb 
        if (values.file) {
          const icon = await uploadToImgBB(values.file);
          imgbb = icon;
        }
        formattedValues = {
          title: values.title,
          coverImage: imgbb,
          description: {
            heading: values.heading,
            text: values.text,
          },
          technologies: values.technologies,
          links: {
            frontEnd: values.frontEnd,
            backEnd: values.backEnd,
            liveLink: values.liveLink,
          },
        };
  console.log(formattedValues)
        await createProject({data: formattedValues }).unwrap();
      } else {
        // For updating an existing project
        formattedValues = {
         
          ...(values.title && { title: values.title }),
          ...(values.coverImage && { coverImage: values.coverImage }),
          ...(values.heading && values.text && {
            description: {
              heading: values.heading,
              text: values.text,
            }
          }),
          ...(values.technologies && { technologies: values.technologies }),
          links: {
            ...(values.frontEnd && { frontEnd: values.frontEnd }),
            ...(values.backEnd && { backEnd: values.backEnd }),
            ...(values.liveLink && { liveLink: values.liveLink }),
          },
        };
  
        if (values.file) {
          const icon = await uploadToImgBB(values.file);
          formattedValues.coverImage = icon;
        }
  console.log(formattedValues)
        await updateProject({data : formattedValues ,  id: project?._id,}).unwrap();
      }
  
      setOpen(false);
    } catch (error) {
      console.error('Failed to save project', error);
    }
  };
  
  

  return (
    <GBModal open={open} setOpen={setOpen} title={isCreating ? 'Create Project' : 'Edit Project'}>
      <GBForm
        onSubmit={submitHandler}
        resolver={zodResolver(validationSchema)}
        defaultValues={defaultValues}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <GBInput name="title" label="Title" fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <GBInput name="frontEnd" label="Frontend Link" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <GBInput name="backEnd" label="Backend Link" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <GBInput name="liveLink" label="Live Link" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <GBInput name="heading" label="Description Heading" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <GBInput name="text" label="Description Text" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <GBInput name="technologies" label="Technologies (comma-separated)" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <GBFileUploader name="file" label="Upload Cover Image" />
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

export default ProjectModal;
