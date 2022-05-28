import styled from 'styled-components';

import { BLACK, LIGHT_GRAY } from 'styles/constants';

export const StyledErrorSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
  gap: 10px 50px;
  padding: 30px;
  background-color: ${LIGHT_GRAY};
`;

export const ErrorImg = styled.img.attrs({ alt: 'error illustration' })`
  width: 35vw;
  height: 28vw;
  max-width: 305px;
  max-height: 250px;
  object-fit: cover;
`;

export const ErrorDescription = styled.div`
  max-width: 20vw;
  min-width: 180px;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
`;

export const Message = styled.p`
  margin-bottom: 10px;
  color: ${BLACK};
`;
