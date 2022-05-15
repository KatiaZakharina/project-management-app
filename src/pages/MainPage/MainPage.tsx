import { ConfirmationModal } from 'components/ConfirmationModal/ConfirmationModal';
import { Header } from 'components/Header/Header';
import { useState } from 'react';

export const MainPage = () => {
  const [openConfirmationModal, setOpenConfirmationModal] = useState(true);
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
