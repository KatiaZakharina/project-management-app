import DeleteIcon from '@mui/icons-material/Delete';
import { AccordionSummary, AccordionDetails, Button } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { ConfirmationModal } from 'components/ConfirmationModal/ConfirmationModal';
import { Header } from 'components/Header/Header';
import {
  WrapperDivMain,
  StyledStack,
  StyledTypography,
  StyledAccordion,
  WrapperButtons,
} from './MainPage.styled';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { deleteBoard, fetchBoards } from 'store/reducers/boards/boardsSlice';

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
    await dispatch(deleteBoard(id));
    closeModal();
  };

  const onCancel = () => {
    closeModal();
  };

  const closeModal = () => {
    setOpenConfirmationModal(false);
    setId('');
  };

  const moveTo = (id: string) => {
    navigate(`/boards/${id}`);
  };

  const { t } = useTranslation();

  return (
    <>
      <Header />
      <WrapperDivMain>
        <StyledStack spacing={2}>
          {boards.map((board) => {
            return (
              <StyledAccordion key={board.id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <StyledTypography variant="h5">{board.title}</StyledTypography>
                </AccordionSummary>
                <AccordionDetails>
                  <StyledTypography variant="subtitle1">{board.description}</StyledTypography>
                  <WrapperButtons>
                    <Button variant="contained" color="secondary" onClick={() => moveTo(board.id)}>
                      To board
                    </Button>
                    <Button
                      data-tag="delete-button"
                      variant="contained"
                      color="warning"
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        setId(board.id);
                        setOpenConfirmationModal(true);
                      }}
                    >
                      {t('Delete')}
                    </Button>
                  </WrapperButtons>
                </AccordionDetails>
              </StyledAccordion>
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
