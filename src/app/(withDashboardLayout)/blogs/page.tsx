"use client"
import React, { useState } from 'react';
import { Box, Button, Grid, Container, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { useGetAllBlogsQuery } from '@/redux/api/blogApi'; 
import BlogPostModal from './components/BlogPostModal'; 
import MoreImageModal from './components/MoreImageModal'; 

const BlogPage = () => {
  const { data: blogs, isLoading, isSuccess } = useGetAllBlogsQuery({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMoreImageModalOpen, setIsMoreImageModalOpen] = useState<boolean>(false);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  const handleAddmoreImage = (blog: any) => {
    setSelectedBlog(blog);
    setIsMoreImageModalOpen(true);
  };

  const handleEdit = (blog: any) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedBlog(null); // Clear selected blog for creating new
    setIsModalOpen(true);
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" my={4}>
        <Typography variant="h4">Blog Posts</Typography>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Create New
        </Button>
      </Box>
      <Grid container spacing={3}>
        {blogs?.map((blog: any) => (
          <Grid item xs={12} key={blog._id}>
            <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                alt={blog.title}
                image={blog.coverImage} // Display cover image
                title={blog.title}
                sx={{ height: 200 }} // Set a standard height for the cover image
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>{blog.title}</Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  <strong>Excerpt:</strong> {blog.excerpt}
                </Typography>
                {/* Display other details like tags, category, etc. if needed */}
              </CardContent>
              <Box mt={2} mb={2} display="flex" justifyContent="center">
                <Button variant="outlined" color="secondary" onClick={() => handleAddmoreImage(blog)}>
                  Add image to gallery
                </Button>
              </Box>
              <Box mb={5} display="flex" justifyContent="center">
                <Button variant="outlined" color="secondary" onClick={() => handleEdit(blog)}>
                  Edit
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <BlogPostModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        blog={selectedBlog}
        isSuccess={isSuccess}
      />
      <MoreImageModal
        open={isMoreImageModalOpen}
        setOpen={setIsMoreImageModalOpen}
        blog={selectedBlog}
      />
    </Container>
  );
};

export default BlogPage;
