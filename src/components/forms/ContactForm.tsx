import { ChangeEvent, FormEvent, FormHTMLAttributes } from "react";
import { Button, DropdownItemProps, Form, Select } from "semantic-ui-react";
import { IContactFormState } from "../../constants/types";
import Input from "../shared/Input";

const CONTACT_OPTIONS = [
  { key: "1", text: "Mobile", value: "Mobile" },
  { key: "2", text: "Home phone", value: "Home phone" },
  { key: "3", text: "E-mail", value: "E-mail" },
  { key: "4", text: "Pager", value: "Pager" },
];

interface IContactForm extends FormHTMLAttributes<HTMLFormElement> {
  handleSubmit(): void;
  handleChangeInput(e: ChangeEvent<HTMLInputElement>): void;
  handleChangeSelect(name: string, value: string): void;

  errorMessage: string | null;

  state: IContactFormState;
}

const ContactForm = ({
  handleSubmit,
  handleChangeInput,
  handleChangeSelect,
  errorMessage,
  state,
}: IContactForm) => {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    handleSubmit();
  };

  const onChangeSelect = (
    _: ChangeEvent<HTMLDivElement>,
    { name, value }: DropdownItemProps
  ) => value && handleChangeSelect(name, value.toString());

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group widths="equal">
        <Input
          name="firstName"
          id="firstName"
          label="First name"
          onChange={handleChangeInput}
          value={state.firstName}
        />

        <Input
          name="lastName"
          id="lastName"
          label="Last name"
          onChange={handleChangeInput}
          value={state.lastName}
        />
      </Form.Group>

      <Input
        type="date"
        name="dateOfBirth"
        id="dateOfBirth"
        label="Date of birth"
        value={state.dateOfBirth}
        onChange={handleChangeInput}
      />

      <Form.Group widths="equal">
        <Input
          control={Select}
          label="Contact type"
          options={CONTACT_OPTIONS}
          onChange={onChangeSelect}
          name="type"
          id="type"
          value={state.type}
          placeholder="Select a contact type"
        />

        <Input
          placeholder="Enter details"
          disabled={state.type === ""}
          value={state.contact}
          name="contact"
          id="type"
          onChange={handleChangeInput}
        />
      </Form.Group>

      <Button type="submit" color="blue">
        Submit
      </Button>

      {errorMessage && <p className="error">{errorMessage}</p>}
    </Form>
  );
};

export default ContactForm;
