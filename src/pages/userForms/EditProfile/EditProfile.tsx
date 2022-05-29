import { useEffect, useState } from 'react';
import { Typography, TextField, Button, Alert } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import {
  ButtonGoBack,
  Logo,
  StyledBox,
  StyledError,
  StyledForm,
  StyledInputBox,
  SnackbarStyled,
  ButtonWrapper,
} from '../userForms.styled';
import { useUserData } from '../useMakeInput';
import { UserInputs } from '../types';
import { deleteUser, editUser, fetchUser, setUnauthorized } from 'store/reducers/user/userSlice';
import { ConfirmationModal } from 'components/ConfirmationModal/ConfirmationModal';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useTranslation } from 'react-i18next';
import { getLoginToken } from 'helpers/getFromCookie';
import { FetchingWrapper } from 'components/helpers/FetchingWrapper/FetchingWrapper';

export function EditProfile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id, user, errorMessage, isDeleted } = useAppSelector((state) => state.userReducer);
  const token = getLoginToken();

  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  useEffect(() => {
    dispatch(fetchUser(id));
  }, []);

  const emptyValues = {
    name: '',
    login: '',
    password: '',
  };

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<UserInputs>({ mode: 'onChange', defaultValues: user || emptyValues });

  const { inputs } = useUserData(register, errors);

  const onEdit: SubmitHandler<UserInputs> = async (data) => {
    dispatch(editUser({ userId: id, data }));
    reset(emptyValues);
  };

  useEffect(() => {
    if (isDeleted) {
      document.cookie = `user=${token};max-age=0;samesite=lax;path=/`;
      document.cookie = `password=${user?.password};max-age=0;samesite=lax;path=/`;
      dispatch(setUnauthorized());
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleted]);

  const onDelete = () => {
    setOpenConfirmationModal(true);
  };
  const onConfirmDelete = async () => {
    await dispatch(deleteUser(id));
    setOpenConfirmationModal(false);
  };
  const onCancelDelete = () => {
    setOpenConfirmationModal(false);
  };

  const { t } = useTranslation();

  return (
    <>
      <StyledBox>
        <ButtonGoBack variant="contained" onClick={() => navigate(-1)}>
          <ArrowBackIosIcon /> Back
        </ButtonGoBack>
        <Logo />
        <FetchingWrapper isLoading={!user} errorMessage={errorMessage}>
          <StyledForm onSubmit={handleSubmit(onEdit)}>
            <Typography>Edit your TLZ account</Typography>
            {inputs.map((input) => (
              <StyledInputBox key={input.id}>
                <TextField
                  label={input.label}
                  type={input.type}
                  {...input.register}
                  fullWidth
                  error={input.error}
                  autoComplete="off"
                />
                <StyledError>{input.errors}</StyledError>
              </StyledInputBox>
            ))}
            <SnackbarStyled open={!!errorMessage}>
              <Alert severity="warning" sx={{ width: '100%' }}>
                {t(errorMessage)}
              </Alert>
            </SnackbarStyled>

            <ButtonWrapper>
              <Button variant="contained" color="warning" onClick={onDelete}>
                Delete
              </Button>
              <Button variant="outlined" type="submit" disabled={!isValid}>
                Edit !
              </Button>
            </ButtonWrapper>
          </StyledForm>
        </FetchingWrapper>
      </StyledBox>

      <ConfirmationModal
        openConfirmationModal={openConfirmationModal}
        onCancel={onCancelDelete}
        onConfirm={onConfirmDelete}
      ></ConfirmationModal>
    </>
  );
}
