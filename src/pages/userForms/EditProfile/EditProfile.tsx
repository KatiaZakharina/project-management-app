import { Typography, TextField, Button } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { useAppDispatch, useAppSelector } from 'store/reducers/user/hooks';
import {
  ButtonGoBack,
  BackendError,
  Logo,
  StyledBox,
  StyledError,
  StyledForm,
  StyledInputBox,
} from '../userForms.styled';
import { useUserData } from '../useMakeInput';
import { UserInputs } from '../types';
import { editUser } from 'store/reducers/user/userSlice';

export function EditProfile() {
  const { name, login, id, password, errorMessage } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const defaultValues = {
    name,
    login,
    password,
  };

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
  } = useForm<UserInputs>({ mode: 'onChange', defaultValues });

  const { inputs } = useUserData(register, errors);

  const onSubmit: SubmitHandler<UserInputs> = async (data) => {
    dispatch(editUser({ userId: id, data }));
    reset(emptyValues);
  };

  return (
    <StyledBox>
      <ButtonGoBack variant="contained" onClick={() => navigate(-1)}>
        <ArrowBackIosIcon /> Back
      </ButtonGoBack>
      <Logo />
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
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
        <BackendError>
          <StyledError>{errorMessage}</StyledError>
        </BackendError>
        <Button variant="outlined" type="submit" disabled={!isValid}>
          Edit!
        </Button>
      </StyledForm>
    </StyledBox>
  );
}
