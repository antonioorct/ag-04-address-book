import { ChangeEvent, useState } from "react";
import { useHistory } from "react-router";
import { Container } from "semantic-ui-react";
import LoginForm from "../components/forms/LoginForm";
import routes from "../constants/routes";
import { ILoginFormState } from "../constants/types";
import LocalStorage from "../utils/LocalStorage";

const initialLoginFormState: ILoginFormState = {
  username: "",
  password: "",
};

const VALID_USERNAME = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const VALID_PASSWORD = /^(?=.*\d)(?=.*[+\-!#$])[A-Za-z\d+\-!#$]{6,}$/;

const Login = () => {
  const [loginFormState, setLoginFormState] = useState(initialLoginFormState);
  const [loginError, setLoginError] = useState<string | null>(null);

  const history = useHistory();

  const isFormValid = () =>
    loginFormState.username.match(VALID_USERNAME) &&
    loginFormState.password.match(VALID_PASSWORD);

  const handleSubmit = () => {
    setLoginError(null);

    if (!isFormValid()) {
      resetForm();
      setLoginError("Invalid credentials");
    } else {
      LocalStorage.setUsername(loginFormState.username);
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
