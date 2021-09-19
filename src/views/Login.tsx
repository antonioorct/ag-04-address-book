import { ChangeEvent, useState } from "react";
import { useHistory } from "react-router";
import { Container } from "semantic-ui-react";
import LoginForm from "../components/forms/LoginForm";
import routes from "../constants/routes";
import { ILoginFormState } from "../constants/types";
import { login } from "../slices/userSlice";
import { useAppDispatch } from "../store";

const initialLoginFormState: ILoginFormState = {
  username: "",
  password: "",
};

const VALID_USERNAME = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const VALID_PASSWORD = /^(?=.*\d)(?=.*[+\-!#$])[A-Za-z\d+\-!#$]{6,}$/;

const Login = () => {
  const dispatch = useAppDispatch();

  const [loginFormState, setLoginFormState] = useState(initialLoginFormState);
  const [loginError, setLoginError] = useState<string | null>(null);

  const history = useHistory();

  const isFormValid = () =>
    loginFormState.username.match(VALID_USERNAME) &&
    loginFormState.password.match(VALID_PASSWORD);

  const isFormFilled = () =>
    loginFormState.username !== "" && loginFormState.password !== "";

  const handleSubmit = () => {
    setLoginError(null);

    if (!isFormFilled()) setLoginError("Please fill in the required fields");
    else if (!isFormValid()) {
      resetForm();
      setLoginError("Invalid credentials");
    } else {
      dispatch(login(loginFormState.username));
      history.push(routes.addressBook.href);
    }
  };

  const handleChangeInput = ({
    currentTarget: { value, name },
  }: ChangeEvent<HTMLInputElement>) =>
    setLoginFormState({
      ...loginFormState,
      [name]: value,
    });

  const resetForm = () => setLoginFormState(initialLoginFormState);

  return (
    <Container>
      <h1>Login</h1>

      <LoginForm
        state={loginFormState}
        handleSubmit={handleSubmit}
        handleChangeInput={handleChangeInput}
        errorMessage={loginError}
      />
    </Container>
  );
};

export default Login;
