"use client";
import React, { useState } from 'react';
import { Box, Button, Grid, Container, Typography, Card, CardContent } from '@mui/material';
import SocialModal from './components/SocialModal'; 
import { useGetAllSocialsQuery } from '@/redux/api/socialAPi';

const SocialsPage = () => {
  const { data: socials, isLoading, isSuccess } = useGetAllSocialsQuery({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedSocial, setSelectedSocial] = useState<any>(null);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleEdit = (social: any) => {
    setSelectedSocial(social);
    setIsModalOpen(true);
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" my={4}>
        <Typography variant="h4">Social Profiles</Typography>
      </Box>
      <Grid container spacing={2}>
        {socials?.map((social: any) => (
          <Grid item xs={12} sm={6} md={4} key={social._id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" align="center">{social.name}</Typography>
                <Typography variant="body1" align="center">Link: {social.link}</Typography>
                <Box mt={2} display="flex" justifyContent="center">
                  <Button variant="outlined" color="secondary" onClick={() => handleEdit(social)}>
                    Edit
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedSocial && (
        <SocialModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          social={selectedSocial}
          isSuccess={isSuccess}
        />
      )}
    </Container>
  );
};

export default SocialsPage;
