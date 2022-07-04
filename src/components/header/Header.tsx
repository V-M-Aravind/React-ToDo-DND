import React from 'react';
import { Search, Clear } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';
type Props = {
  filteredText: string;
  setFilteredText: React.Dispatch<React.SetStateAction<string>>;
};
const Header = ({ filteredText, setFilteredText }: Props): JSX.Element => {
  let clearIcon = null;
  if (filteredText.length > 0) {
    clearIcon = (
      <Clear
        sx={{
          '&:hover': {
            cursor: 'pointer',
          },
        }}
        onClick={() => setFilteredText('')}
      />
    );
  }

  return (
    <div className='header-container'>
      <h1>
        <b>TASKIFY</b>
      </h1>
      <TextField
        placeholder='search'
        sx={{ ml: 'auto', mr: 4, pt: 3 }}
        onChange={(event) => {
          setFilteredText(event?.target.value);
        }}
        value={filteredText}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Search />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>{clearIcon}</InputAdornment>
          ),
        }}
        variant='standard'
      />
    </div>
  );
};

export default Header;
