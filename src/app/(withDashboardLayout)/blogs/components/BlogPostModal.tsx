import React, { useState, useEffect } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import GBInput from '@/components/Forms/GBInput';
import GBForm from '@/components/Forms/GBForm';
import GBModal from '@/components/GBModal/GBModal';
import { useCreateBlogsMutation, useUpdateBlogsMutation } from '@/redux/api/blogApi';
import JoditEditor from 'jodit-react'; // Import JoditEditor
import GBFileUploader from '@/components/Forms/GBFileUploader'; // Import GBFileUploader
import uploadToImgBB from '@/utils/uploadToImgBB';

const validationSchema = z.object({
  title: z.string().optional(),
  coverImage: z.string().optional(),
  excerpt: z.string().optional(),
  tags: z.any().optional(),
  category: z.string().optional(),
  publishDate: z.string().optional(),
  estimatedReadingTime: z.string().optional(),
  file: z.any().optional(),
});

const BlogPostModal = ({ open, setOpen, blog, isSuccess }: any) => {
  const [defaultValues, setDefaultValues] = useState<FieldValues>({});
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [updateBlog] = useUpdateBlogsMutation();
  const [createBlog] = useCreateBlogsMutation();
  const [content, setContent] = useState<string>(''); // State for Jodit content

  useEffect(() => {
    if (isSuccess && blog) {
      setDefaultValues({
        title: blog.title || '',
        coverImage: blog.coverImage || '',
        excerpt: blog.excerpt || '',
        tags: blog.tags ? blog.tags.join(', ') : [], // Convert tags array to comma-separated string
        category: blog.category || '',
        publishDate: blog.publishDate || '', // Assigning publishDate if available
        estimatedReadingTime: blog.estimatedReadingTime || '', // Assigning estimatedReadingTime if available
      });
      setContent(blog.content || '');
    } else {
      setDefaultValues({
        title: '',
        coverImage: '',
        excerpt: '',
        tags: [],
        category: '',
        publishDate: '', // Initializing publishDate
        estimatedReadingTime: '', // Initializing estimatedReadingTime
      });
      setContent('');
    }
    setIsCreating(!blog); // Set mode to create if no blog is selected
  }, [isSuccess, blog]);

  const submitHandler = async (values: FieldValues) => {
    
    try {
      let imgbb 
      if (values.file) {
        const icon = await uploadToImgBB(values.file);
        imgbb = icon;
      }

      let formattedValues: any = {
        title: values.title,
        coverImage: imgbb,
        excerpt: values.excerpt,
        content: content, // Use Jodit content here
        tags: values.tags ? values.tags.split(',').map((tag: any) => tag.trim()) : [], // Convert comma-separated string back to array
        category: values.category,
        publishDate: values.publishDate,
        estimatedReadingTime: Number(values.estimatedReadingTime),
      };

      if (isCreating) {
        // For creating a new blog post
        await createBlog({ data: formattedValues }).unwrap();
      } else {
        // For updating an existing blog post
        await updateBlog({ data: formattedValues, id: blog?._id }).unwrap();
      }

      setOpen(false);
    } catch (error) {
      console.error('Failed to save blog post', error);
    }
  };

  return (
    <GBModal open={open} setOpen={setOpen} title={isCreating ? 'Create Blog Post' : 'Edit Blog Post'}>
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
            <GBFileUploader name="file" label="Upload Cover Image" />
          </Grid>
          <Grid item xs={12}>
            <GBInput name="excerpt" label="Excerpt" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <GBInput name="tags" label="Tags (comma-separated)" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <GBInput name="category" label="Category" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <GBInput name="publishDate" label="Publish Date" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <GBInput name="estimatedReadingTime" label="Estimated Reading Time" fullWidth />
          </Grid>
        </Grid>
        <JoditEditor
          value={content}
          config={{
            readonly: false,
          }}
          // tabIndex={1}
          onBlur={(newContent: string) => setContent(newContent)}
        />
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </GBForm>
    </GBModal>
  );
};

export default BlogPostModal;
