import React from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({ onSearch }) {
  return (
    <Box sx={{ my: 2, textAlign: 'center' }}>
      <TextField
        type="text"
        placeholder="Search products..."
        onChange={(e) => onSearch(e.target.value)}
        variant="outlined"
        size="small"
        sx={{
          width: 250,
          bgcolor: '#F8F1E9',
          '& .MuiOutlinedInput-root': {
            color: '#1A2B4A',
            '& fieldset': { borderColor: '#D4A017', borderRadius: '5px' },
            '&:hover fieldset': { borderColor: '#1A2B4A' },
            '&.Mui-focused fieldset': { borderColor: '#D4A017' }
          },
          '& .MuiInputBase-input': { padding: '8px' }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#1A2B4A' }} />
            </InputAdornment>
          )
        }}
      />
    </Box>
  );
}

export default SearchBar;