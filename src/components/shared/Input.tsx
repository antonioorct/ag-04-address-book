import { Form, FormInputProps } from "semantic-ui-react";

interface InputProps extends FormInputProps {
  errorMessage?: string;
}

const Input = ({ errorMessage, ...props }: InputProps) => {
  return (
    <Form.Input
      {...props}
      error={errorMessage && { pointing: "above", content: errorMessage }}
    />
  );
};

export default Input;
