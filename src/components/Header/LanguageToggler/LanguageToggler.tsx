import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

export const LanguageToggler = () => {
  const [language, setLanguage] = useState('en');

  const handleChange = (event: React.MouseEvent<HTMLElement>, newLanguage: string) => {
    setLanguage(newLanguage);
  };

  return (
    <ToggleButtonGroup color="secondary" value={language} exclusive onChange={handleChange}>
      <ToggleButton value="en">EN</ToggleButton>
      <ToggleButton value="ru">RU</ToggleButton>
    </ToggleButtonGroup>
  );
};
