import styled from 'styled-components';
import { ToggleButtonGroup } from '@mui/material';

import { AZURE_BLUE, WHITE } from 'styles/constants';

export const ToggleWrapper = styled(ToggleButtonGroup)`
  &.MuiToggleButtonGroup-root {
    box-shadow: 3px 3px 5px ${AZURE_BLUE};
    margin: 0 10px;
    @media screen and (max-width: 880px) {
      box-shadow: none;
    }
  }
  & > button {
    border: 2px solid ${AZURE_BLUE};
    color: ${WHITE};
    @media screen and (max-width: 880px) {
      box-shadow: none;
      border: none;
    }
  }
`;
