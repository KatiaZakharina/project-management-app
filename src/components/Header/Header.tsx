import React, { useEffect, useState } from 'react';

import { WrapperHeader, ContentHeader, Logo } from './Header.styled';
import { LanguageToggler } from './LanguageToggler/LanguageToggler';

export const Header = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const toggleClass = () => {
      window.pageYOffset > 0 ? setIsActive(true) : setIsActive(false);
    };
    window.addEventListener('scroll', toggleClass);
  }, []);

  return (
    <WrapperHeader className={isActive ? 'active' : ''}>
      <ContentHeader>
        <Logo />
        <LanguageToggler />
      </ContentHeader>
    </WrapperHeader>
  );
};
