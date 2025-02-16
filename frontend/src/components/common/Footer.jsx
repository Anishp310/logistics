import React from 'react';
import { Box, Typography, Container, Divider } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ backgroundColor: '#333', color: '#fff', py: 3, position: 'relative', bottom: 0, width: '100%' }}>
      <Container maxWidth="xl">
        <Divider sx={{ borderColor: '#fff' }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 2 }}>
          <Typography variant="body2" sx={{ fontSize: '14px' }}>
            &copy; {new Date().getFullYear()} Your Company. All Rights Reserved.
          </Typography>
          <Box>
            <Typography variant="body2" sx={{ fontSize: '14px', marginRight: 2 }}>Privacy Policy</Typography>
            <Typography variant="body2" sx={{ fontSize: '14px' }}>Terms of Service</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
