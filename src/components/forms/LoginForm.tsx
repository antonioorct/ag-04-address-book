import { ChangeEvent, FormEvent, FormHTMLAttributes } from "react";
import { Button, Form } from "semantic-ui-react";
import { ILoginFormState } from "../../constants/types";
import Input from "../shared/Input";

interface ILoginForm extends FormHTMLAttributes<HTMLFormElement> {
  handleSubmit(): void;
  handleChangeInput(e: ChangeEvent<HTMLInputElement>): void;

  errorMessage: string | null;

  state: ILoginFormState;
}

const LoginForm = ({
  handleSubmit,
  handleChangeInput,
  errorMessage,
  state,
}: ILoginForm) => {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    handleSubmit();
  };

  return (
    <Form onSubmit={onSubmit}>
      <Input
        name="username"
        label="Username"
        onChange={handleChangeInput}
        value={state.username}
      />

      <Input
        type="password"
        name="password"
        label="Password"
        onChange={handleChangeInput}
        value={state.password}
      />

      {errorMessage && <p className="error">{errorMessage}</p>}

      <Button type="submit" color="blue">
        Submit
      </Button>
    </Form>
  );
};

export default LoginForm;
