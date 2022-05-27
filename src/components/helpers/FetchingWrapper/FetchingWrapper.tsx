import { ReactElement } from 'react';
import { CircularProgress } from '@mui/material';

import { ErrorDescription, ErrorImg, Message, StyledErrorSection } from './FetchingWrapper.styled';
import error from 'assets/svg/error.svg';

type Props = {
  isLoading: boolean;
  errorMessage: string;
  children: ReactElement;
};

export const FetchingWrapper = ({ children, errorMessage, isLoading }: Props) => {
  return errorMessage ? (
    <StyledErrorSection>
      <ErrorImg src={error} />
      <ErrorDescription>
        <Message>{errorMessage}</Message>
      </ErrorDescription>
    </StyledErrorSection>
  ) : isLoading ? (
    <CircularProgress color="secondary" style={{ margin: 'auto' }} size={80} thickness={4} />
  ) : (
    children
  );
};
