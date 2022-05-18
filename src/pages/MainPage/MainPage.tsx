import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ConfirmationModal } from 'components/ConfirmationModal/ConfirmationModal';
import { Header } from 'components/Header/Header';
import {
  WrapperBoardDiv,
  WrapperDivMain,
  StyledStack,
  StyledTypography,
  WrapperDescriptionRepo,
} from './MainPage.styled';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchBoards } from 'store/reducers/boards/boardsSlice';
import { boardsServiceInstance } from 'service/boardsService';

export const MainPage = () => {
  const { boards } = useAppSelector((state) => state.boardsReducer);
  const dispatch = useAppDispatch();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [id, setId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadBoards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadBoards = () => {
    dispatch(fetchBoards());
  };

  const onConfirm = async () => {
    await boardsServiceInstance.deleteBoard(id);
    //TODO: move to the thunk
    loadBoards();
    closeModal();
  };

  const onCancel = () => {
    closeModal();
  };

  const closeModal = () => {
    setOpenConfirmationModal(false);
    setId('');
  };

  const moveTo = (event: React.MouseEvent, id: string) => {
    const eventTarget = event.target as Element & { dataset: Record<string, string> };
    if (
      eventTarget.dataset.tag !== 'delete-button' &&
      eventTarget.dataset.testid !== 'DeleteIcon'
    ) {
      navigate(`/boards/${id}`);
    }
  };

  return (
    <>
      <Header></Header>
      <WrapperDivMain>
        <StyledStack spacing={2}>
          {boards.map((board) => {
            return (
              <WrapperBoardDiv key={board.id} onClick={(event) => moveTo(event, board.id)}>
                <WrapperDescriptionRepo>
                  <StyledTypography variant="h5">{board.title}</StyledTypography>
                  <StyledTypography variant="subtitle1">
                    {board.columns?.[0].tasks?.[0].title}
                  </StyledTypography>
                  <StyledTypography variant="subtitle1">
                    {board.columns?.[0].tasks?.[0].description}
                  </StyledTypography>
                </WrapperDescriptionRepo>
                <Button
                  data-tag="delete-button"
                  sx={{ height: 35, marginTop: 2.5 }}
                  variant="contained"
                  color="warning"
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    setId(board.id);
                    setOpenConfirmationModal(true);
                  }}
                >
                  Delete
                </Button>
              </WrapperBoardDiv>
            );
          })}
        </StyledStack>
      </WrapperDivMain>
      <ConfirmationModal
        openConfirmationModal={openConfirmationModal}
        onCancel={onCancel}
        onConfirm={onConfirm}
      ></ConfirmationModal>
    </>
  );
};
