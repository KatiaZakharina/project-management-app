import React, { useEffect, useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';

import { WrapperHeader, ContentHeader, Logo, WrapperButtons, StyledButton } from './Header.styled';
import { LanguageToggler } from './LanguageToggler/LanguageToggler';
import { ModalAddBoard } from './ModalAddBoard/ModalAddBoard';

export const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const toggleClass = () => {
      window.pageYOffset > 0 ? setIsActive(true) : setIsActive(false);
    };
    window.addEventListener('scroll', toggleClass);
  }, []);

  const openModalAddBoard = () => {
    setOpenModal(true);
  };

  const toSignOut = () => {
    navigate(`/welcome`);
  };

  const buttons = [
    { text: 'Add new board', icon: <AddCircleIcon />, onClick: openModalAddBoard },
    { text: 'Edit profile', icon: <EditIcon /> },
    { text: 'Sign out', icon: <LogoutIcon />, onClick: toSignOut },
  ];

  return (
    <>
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
      <ModalAddBoard openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};
