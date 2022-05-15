import { useState } from 'react';

import { ConfirmationModal } from 'components/ConfirmationModal/ConfirmationModal';
import { Header } from 'components/Header/Header';

export const MainPage = () => {
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  return (
    <>
      <Header></Header>
      <ConfirmationModal
        openConfirmationModal={openConfirmationModal}
        setOpenConfirmationModal={setOpenConfirmationModal}
      ></ConfirmationModal>
    </>
  );
};
