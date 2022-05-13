import { useEffect, useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { WrapperHeader, ContentHeader, Logo, WrapperButtons, StyledButton } from './Header.styled';
import { LanguageToggler } from './LanguageToggler/LanguageToggler';

export const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const toggleClass = () => {
      window.pageYOffset > 0 ? setIsActive(true) : setIsActive(false);
    };
    window.addEventListener('scroll', toggleClass);
  }, []);

  const toSignOut = () => {
    navigate(`/welcome`);
  };

  const { t } = useTranslation();
  const addText = t('Add new board');
  const editText = t('Edit profile');
  const outText = t('Sign out');

  const buttons = [
    { text: addText, icon: <AddCircleIcon /> },
    { text: editText, icon: <EditIcon /> },
    { text: outText, icon: <LogoutIcon />, onClick: toSignOut },
  ];

  return (
    <WrapperHeader className={isActive ? 'active' : ''}>
      <ContentHeader>
        <Logo />
        <WrapperButtons>
          {buttons.map((button, index) => {
            return (
              <StyledButton
                key={index}
                variant="contained"
                color="primary"
                startIcon={button.icon}
                onClick={button.onClick}
              >
                {button.text}
              </StyledButton>
            );
          })}
          <LanguageToggler />
        </WrapperButtons>
      </ContentHeader>
    </WrapperHeader>
  );
};
