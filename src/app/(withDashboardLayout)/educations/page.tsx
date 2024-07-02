"use client";
import React, { useState } from 'react';
import { Box, Button, Grid, Container, Typography, Card, CardContent } from '@mui/material';
import { useGetAllEducationsQuery } from '@/redux/api/educationApi';
import EducationModal from './components/EducationModal';

const EducationPage = () => {
  const { data: educations, isLoading, isSuccess } = useGetAllEducationsQuery({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedEducation, setSelectedEducation] = useState<any>(null);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleEdit = (education: any) => {
    setSelectedEducation(education);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedEducation(null); // Clear selected education for creating new
    setIsModalOpen(true);
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" my={4}>
        <Typography variant="h4">Education</Typography>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Create New
        </Button>
      </Box>
      <Grid container spacing={2}>
        {educations?.map((education: any) => (
          <Grid item xs={12} sm={6} md={4} key={education._id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" align="center">{education.institutionName}</Typography>
                <Typography variant="body1" align="center">Degree: {education.degreeName}</Typography>
                <Typography variant="body1" align="center">Department: {education.department}</Typography>
                <Typography variant="body1" align="center">Years: {education.admitYear} - {education.passingYear}</Typography>
                <Typography variant="body1" align="center">Result: {education.result}</Typography>
                <Typography variant="body1" align="center">Location: {education.location}</Typography>
                <Box mt={2} display="flex" justifyContent="center">
                  <Button variant="outlined" color="secondary" onClick={() => handleEdit(education)}>
                    Edit
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <EducationModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        education={selectedEducation}
        isSuccess={isSuccess}
      />
    </Container>
  );
};

export default EducationPage;
