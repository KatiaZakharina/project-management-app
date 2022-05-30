import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

import {
  StyledDiv,
  StyledTitle,
  StyledText,
  WrapperWelcomeText,
  WrapperDivButtons,
  Logo,
  ContainerWelcomePage,
  ContainerAboutUs,
  WrapperDevelopers,
  StyledPhoto,
  LinkDeveloper,
  StyledTypography,
  DivTypography,
} from './WelcomePage.styled';
import { getLoginToken } from 'helpers/getFromCookie';
import { TEAM_MATES } from 'appConstants';

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
              {t('Go to main page')}
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
      <ContainerAboutUs>
        <KeyboardDoubleArrowDownIcon
          sx={{ width: 120, height: 120 }}
          color="primary"
        ></KeyboardDoubleArrowDownIcon>
        <StyledTypography variant="h1">About us</StyledTypography>
        <WrapperDevelopers>
          {TEAM_MATES.map((member) => {
            return (
              <LinkDeveloper href={member.link} key={member.id} target="_blank">
                <StyledPhoto src={member.src}></StyledPhoto>
                <DivTypography>
                  <StyledTypography variant="h4">{member.name}</StyledTypography>
                  <StyledTypography variant="h6">{member.text}</StyledTypography>
                </DivTypography>
              </LinkDeveloper>
            );
          })}
        </WrapperDevelopers>
      </ContainerAboutUs>
    </StyledDiv>
  );
};
