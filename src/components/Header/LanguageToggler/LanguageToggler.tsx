import React from 'react';
import { ToggleButton } from '@mui/material';

import { ToggleWrapper } from './LanguageToggler.styled';
import i18n from 'translation';

export const LanguageToggler = () => {
  const handleChange = (event: React.MouseEvent<HTMLElement>, newLanguage: string) => {
    i18n.changeLanguage(newLanguage);
  };

  return (
    <ToggleWrapper color="secondary" exclusive onChange={handleChange}>
      <ToggleButton value="en">EN</ToggleButton>
      <ToggleButton value="ru">RU</ToggleButton>
    </ToggleWrapper>
  );
};
