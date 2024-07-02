"use client"
import React, { useState } from 'react';
import { Container, Button, Box, Grid } from '@mui/material';

import { useGetUserQuery } from '@/redux/api/userApi';
import ProfileUpdateModal from './components/ProfileUpdateModal';
import ProfileDisplay from './components/ProfileDisplay';

const Profile = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { data, isLoading } = useGetUserQuery({});
console.log(data)
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <Box sx={{ height: 200, mb: 2, width: '100%', overflow: 'hidden', borderRadius: 1 }}>
            <img src={data?.userImage} alt="Profile Photo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Box>
          <Button fullWidth variant="contained" onClick={() => setIsProfileModalOpen(true)}>
            Edit Profile
          </Button>
        </Grid>
        <Grid item xs={12} md={8}>
          <ProfileDisplay data={data} />
        </Grid>
      </Grid>
      <ProfileUpdateModal open={isProfileModalOpen} setOpen={setIsProfileModalOpen} id={data?._id} />
    </Container>
  );
};

export default Profile;
