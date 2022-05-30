import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <StyledModal open={openConfirmationModal} onClose={onCancel}>
      <StyledBox>
        <Typography>{t('Are you sure that you want to delete?')}</Typography>
        <WrapperButtons>
          <Button variant="outlined" onClick={onCancel}>
            {t('Cancel')}
          </Button>
          <Button variant="contained" color="warning" onClick={onConfirm}>
            {t('Delete')}
          </Button>
        </WrapperButtons>
      </StyledBox>
    </StyledModal>
  );
};
