import CloseIcon from '@mui/icons-material/Close';

import styled from 'styled-components';
import { GRAY, LIGHT_GRAY } from 'styles/constants';

export const StyledColumn = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 50px 1fr;
  width: 100%;
  max-width: 250px;
  min-width: 200px;
  margin: 0 15px 10px 15px;
  background-color: ${LIGHT_GRAY};
  border-radius: 5px;
`;

export const Title = styled.div`
  display: flex;
  min-height: 60px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${GRAY};
  padding: 10px;
`;

export const AddPanel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 10px;
  cursor: pointer;
  @media screen and (max-width: 800px) {
    font-size: 0;
  }
`;

export const StyledCloseIcon = styled(CloseIcon)`
  cursor: pointer;
`;
