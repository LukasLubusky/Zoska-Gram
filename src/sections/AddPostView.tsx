'use client';

import { useState } from 'react';
import { Box, Button, TextField, Paper, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function AddPostView() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedImage) {
      alert('Please select an image');
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('caption', caption);

      const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      // After successful post creation, redirect to home page
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          {previewUrl ? (
            <Box sx={{ position: 'relative', width: '100%', maxWidth: 500, height: 300 }}>
              <Image
                src={previewUrl}
                alt="Selected"
                fill
                style={{ objectFit: 'contain' }}
              />
            </Box>
          ) : (
            <Typography color="text.secondary">No image selected</Typography>
          )}
          
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            disabled={isSubmitting}
          >
            Upload Image
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
        </Box>

        <TextField
          label="Caption"
          multiline
          rows={4}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          disabled={isSubmitting}
          placeholder="Write a caption for your post..."
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!selectedImage || isSubmitting}
          sx={{ alignSelf: 'flex-end' }}
        >
          {isSubmitting ? 'Creating Post...' : 'Create Post'}
        </Button>
      </Box>
    </Paper>
  );
}
