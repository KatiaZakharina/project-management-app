import { Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import { useState } from 'react';

import { ConfirmationModal } from 'components/ConfirmationModal/ConfirmationModal';
import { Header } from 'components/Header/Header';
import { WrapperBoardDiv, WrapperDivMain, StyledStack } from './MainPage.styled';
import { useAppDispatch, useAppSelector } from 'store/reducers/user/hooks';
import { fetchBoards } from 'store/reducers/boards/boardsSlice';
import { loginServiceInstance } from 'service/userService';

export const MainPage = () => {
  const { boards } = useAppSelector((state) => state.boardsReducer);
  const dispatch = useAppDispatch();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  useEffect(() => {
    dispatch(fetchBoards());
  }, []);

  const deleteBoard = (id: string) => {
    setOpenConfirmationModal(true);
    loginServiceInstance.deleteBoard(id);
  };

  return (
    <>
      <Header></Header>
      <WrapperDivMain>
        <StyledStack spacing={2}>
          {boards.map((board) => {
            return (
              <WrapperBoardDiv key={board.id}>
                <div>
                  <Typography variant="h5">{board.title}</Typography>
                  <Typography>{board.columns?.[0].tasks?.[0].description}</Typography>
                  <Typography>fdfdfdf</Typography>
                </div>
                <Button
                  variant="contained"
                  color="warning"
                  startIcon={<DeleteIcon />}
                  onClick={() => deleteBoard(board.id)}
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
        setOpenConfirmationModal={setOpenConfirmationModal}
      ></ConfirmationModal>
    </>
  );
};
