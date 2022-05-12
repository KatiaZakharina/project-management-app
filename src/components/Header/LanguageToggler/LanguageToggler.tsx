import React, { useState } from 'react';
import { ToggleButton } from '@mui/material';

import { ToggleWrapper } from './LanguageToggler.styled';

export const LanguageToggler = () => {
  const [language, setLanguage] = useState('en');

  const handleChange = (event: React.MouseEvent<HTMLElement>, newLanguage: string) => {
    setLanguage(newLanguage);
  };

  return (
    <ToggleWrapper color="secondary" value={language} exclusive onChange={handleChange}>
      <ToggleButton value="en">EN</ToggleButton>
      <ToggleButton value="ru">RU</ToggleButton>
    </ToggleWrapper>
  );
};
