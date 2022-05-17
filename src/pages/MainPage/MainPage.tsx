import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import { useState } from 'react';

import { ConfirmationModal } from 'components/ConfirmationModal/ConfirmationModal';
import { Header } from 'components/Header/Header';
import {
  WrapperBoardDiv,
  WrapperDivMain,
  StyledStack,
  StyledTypography,
  WrapperDescriptionRepo,
  DeleteButton,
} from './MainPage.styled';
import { useAppDispatch, useAppSelector } from 'store/reducers/user/hooks';
import { fetchBoards } from 'store/reducers/boards/boardsSlice';
import { loginServiceInstance } from 'service/userService';
import { useNavigate } from 'react-router-dom';

export const MainPage = () => {
  const { boards } = useAppSelector((state) => state.boardsReducer);
  const dispatch = useAppDispatch();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [id, setId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadBoards();
  }, []);

  const loadBoards = () => {
    dispatch(fetchBoards());
  };

  const onConfirm = async () => {
    await loginServiceInstance.deleteBoard(id);
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
    console.log(eventTarget);
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
                    {board.columns?.[0].tasks?.[0].description}
                  </StyledTypography>
                </WrapperDescriptionRepo>
                <DeleteButton
                  data-tag="delete-button"
                  sx={{ height: 35, marginTop: 1 }}
                  variant="contained"
                  color="warning"
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    setId(board.id);
                    setOpenConfirmationModal(true);
                  }}
                >
                  Delete
                </DeleteButton>
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
