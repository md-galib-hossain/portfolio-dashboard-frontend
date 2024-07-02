"use client";
import React, { useState } from 'react';
import { Box, Button, Grid, Container, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { useGetAllProjectsQuery, useUpdateProjectMutation } from '@/redux/api/projectApi';
import ProjectModal from './components/ProjectModal ';
import MoreImageModal from './components/MoreImageModal';

const ProjectsPage = () => {
  const { data: projects, isLoading, isSuccess } = useGetAllProjectsQuery({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMoreImageModalOpen, setIsMoreImageModalOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [updateProject] = useUpdateProjectMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleAddmoreImage = (project: any) => {
    setSelectedProject(project);
    setIsMoreImageModalOpen(true);
  };

  const handleEdit = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedProject(null); // Clear selected project for creating new
    setIsModalOpen(true);
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" my={4}>
        <Typography variant="h4">Projects</Typography>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Create New
        </Button>
      </Box>
      <Grid container spacing={3}>
        {projects?.map((project: any) => (
          <Grid item xs={12} key={project._id}>
            <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                alt={project.title}
                image={project.coverImage} // Display cover image
                title={project.title}
                sx={{ height: 200 }} // Set a standard height for the cover image
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>{project.title}</Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  <strong>Technologies:</strong> {project.technologies.join(', ')}
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  <strong>Frontend Link:</strong> {project.links.frontEnd}
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  <strong>Backend Link:</strong> {project.links.backEnd}
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  <strong>Live Link:</strong> {project.links.liveLink}
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  <strong>Description:</strong> {project.description.text}
                </Typography>
              </CardContent>
              <Box mt={2} flexGrow={1} display="flex" justifyContent="center" alignItems="flex-end">
                {project.images && (
                  <Grid container spacing={1}>
                    {project.images.map((image: string, index: number) => (
                      <Grid item xs={4} key={index}>
                        <CardMedia
                          component="img"
                          alt={`Image ${index + 1}`}
                          image={image}
                          title={`Image ${index + 1}`}
                          sx={{ height: 100, width: '100%', objectFit: 'cover' }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
              <Box mt={2} mb={2} display="flex" justifyContent="center">
                <Button variant="outlined" color="secondary" onClick={() => handleAddmoreImage(project)}>
                  Add image to gallery
                </Button>
              </Box>
              <Box mb={5} display="flex" justifyContent="center">
                <Button variant="outlined" color="secondary" onClick={() => handleEdit(project)}>
                  Edit
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <ProjectModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        project={selectedProject}
        isSuccess={isSuccess}
      />
      <MoreImageModal
        open={isMoreImageModalOpen}
        setOpen={setIsMoreImageModalOpen}
        project={selectedProject}
      />
    </Container>
  );
};

export default ProjectsPage;
