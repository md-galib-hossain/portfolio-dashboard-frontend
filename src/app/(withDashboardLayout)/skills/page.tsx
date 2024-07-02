"use client";
import dynamic from 'next/dynamic';

import React, { useState } from 'react';
import { Box, Button, Grid, Container, Typography, Card, CardContent } from '@mui/material';
import { useGetAllSkillsQuery } from '@/redux/api/skillApi';
import SkillModal from './components/SkillModal';


const MoreImageMSkillModalodal = dynamic(() => import('./components/SkillModal'), { ssr: false })
const SkillsPage = () => {
  const { data: skills, isLoading, isSuccess } = useGetAllSkillsQuery({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleEdit = (skill: any) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedSkill(null); // Clear selected skill for creating new
    setIsModalOpen(true);
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" my={4}>
        <Typography variant="h4">Skills</Typography>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Create New
        </Button>
      </Box>
      <Grid container spacing={2}>
        {skills?.map((skill: any) => (
          <Grid item xs={12} sm={6} md={4} key={skill._id}>
            <Card variant="outlined">
              {skill.icon && (
                <img src={skill.icon} alt={skill.name} style={{ width: '100%', maxHeight: '150px', objectFit: 'cover' }} />
              )}
              <CardContent>
                <Typography variant="h6" align="center">{skill.name}</Typography>
                <Typography variant="body1" align="center">Level: {skill.level}</Typography>
                <Typography variant="body1" align="center">Category: {skill.category}</Typography>
                <Typography variant="body1" align="center">Priority: {skill.priority}</Typography>
                <Box mt={2} display="flex" justifyContent="center">
                  <Button variant="outlined" color="secondary" onClick={() => handleEdit(skill)}>
                    Edit
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <SkillModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        skill={selectedSkill}
        isSuccess={isSuccess}
      />
    </Container>
  );
};

export default SkillsPage;
