import { Button, Typography } from '@mui/material';

import { StyledBox, StyledModal, WrapperButtons } from './ConfirmationModal.styled';

interface IConfirmationModal {
  openConfirmationModal: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmationModal = ({
  openConfirmationModal,
  onCancel,
  onConfirm,
}: IConfirmationModal) => {
  return (
    <StyledModal open={openConfirmationModal} onClose={onCancel}>
      <StyledBox>
        <Typography>Are you sure that you want to delete?</Typography>
        <WrapperButtons>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="warning" onClick={onConfirm}>
            Delete
          </Button>
        </WrapperButtons>
      </StyledBox>
    </StyledModal>
  );
};
