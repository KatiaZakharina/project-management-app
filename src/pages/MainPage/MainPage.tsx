import { useState } from 'react';

import { ConfirmationModal } from 'components/ConfirmationModal/ConfirmationModal';
import { Header } from 'components/Header/Header';

export const MainPage = () => {
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const onConfirm = async () => {};

  const onCancel = () => {};

  return (
    <>
      <Header></Header>
      <ConfirmationModal
        openConfirmationModal={openConfirmationModal}
        onCancel={onCancel}
        onConfirm={onConfirm}
      ></ConfirmationModal>
    </>
  );
};
