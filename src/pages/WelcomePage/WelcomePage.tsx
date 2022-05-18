import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import {
  StyledDiv,
  StyledTitle,
  StyledText,
  WrapperWelcomeText,
  WrapperDivButtons,
  Logo,
  ContainerWelcomePage,
} from './WelcomePage.styled';
import { getLoginToken } from 'helpers/getLoginToken';

export const WelcomePage = () => {
  const navigate = useNavigate();

  const loginToken = getLoginToken();

  const moveTo = (link: string) => {
    navigate(`${link}`);
  };

  const { t } = useTranslation();

  return (
    <StyledDiv>
      <ContainerWelcomePage>
        <WrapperWelcomeText>
          <Logo />
          <StyledTitle>{t('Welcome')}</StyledTitle>
          <StyledText>{t('to TLZ project management app')}</StyledText>
        </WrapperWelcomeText>
        <WrapperDivButtons>
          {loginToken ? (
            <Button variant="contained" onClick={() => moveTo('/')}>
              {t('Go to Main Page')}
            </Button>
          ) : (
            <>
              <Button variant="outlined" onClick={() => moveTo('/signin')}>
                {t('Sign In')}
              </Button>
              <Button variant="contained" onClick={() => moveTo('/signup')}>
                {t('Sign Up')}
              </Button>
            </>
          )}
        </WrapperDivButtons>
      </ContainerWelcomePage>
    </StyledDiv>
  );
};
