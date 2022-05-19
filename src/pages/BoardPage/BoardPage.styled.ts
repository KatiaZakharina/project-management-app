import styled from 'styled-components';

export const ColumnList = styled.div`
  display: flex;
  flex: 1 1 auto;
  gap: 20px;
  height: 100%;
  margin-left: 20px;
`;

export const ColumnListWrapper = styled.div`
  width: calc(100vw - 20px);
  max-width: 1440px;
  height: calc(100vh - 230px);
  margin: 0 auto;
  overflow-y: auto;
`;
