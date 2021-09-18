import { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Container } from "semantic-ui-react";
import ContactForm from "../components/forms/ContactForm";
import routes from "../constants/routes";
import { IContact, IContactFormState } from "../constants/types";
import { createContact } from "../services/contactServices";

const initialContactFormState: IContactFormState = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  type: "",
  contact: "",
};

// TODO: replace with function that returns regex with min/max chars
const VALID_FIRST_NAME = /^[a-zA-Z]{1,100}$/;
const VALID_LAST_NAME = /^[a-zA-Z]{1,300}$/;
const VALID_NUMBER = /^[\d]{9,11}$/;
const VALID_EMAIL = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const Contact = () => {
  const [contactFormState, setContactFormState] = useState(
    initialContactFormState
  );
  const [error, setError] = useState<string | null>(null);

  const { state } = useLocation<{ contact: IContact }>();

  const history = useHistory();

  useEffect(() => {
    state !== undefined && setContactFormState(state.contact);
  }, [state]);

  const getAreFieldsFilled = () =>
    Object.keys(contactFormState).every((key) => {
      const value = contactFormState[key as keyof IContactFormState];

      if (typeof value === "string") return value !== "";
      else if (typeof value === "number") return value !== 0;
      else return value !== undefined;
    });

  const getErrorMessage = () => {
    if (!getAreFieldsFilled()) return "Please fill in the required fields";

    if (!contactFormState.firstName.match(VALID_FIRST_NAME))
      return "First name must be between 1 and 100 characters";
    if (!contactFormState.lastName.match(VALID_LAST_NAME))
      return "Last name must be between 1 and 300 characters";
    switch (contactFormState.type) {
      case "E-mail":
        if (!contactFormState.contact.match(VALID_EMAIL))
          return "E-mail must be valid";
        break;
      default:
        if (!contactFormState.contact.match(VALID_NUMBER))
          return "Contact number must be valid";
    }
  };

  const handleSubmit = async () => {
    setError(null);

    const errMsg = getErrorMessage();

    if (errMsg) setError(errMsg);
    else {
      await createContact(contactFormState);
      history.push(routes.addressBook.href);
    }
  };

  const handleChangeInput = ({
    currentTarget: { value, name },
  }: ChangeEvent<HTMLInputElement>) =>
    setContactFormState({
      ...contactFormState,
      [name]: value,
    });

  const handleChangeSelect = (name: string, value: string) =>
    setContactFormState({
      ...contactFormState,
      [name]: value,
    });

  return (
    <Container>
      <h1>New Contact</h1>

      <ContactForm
        state={contactFormState}
        handleSubmit={handleSubmit}
        handleChangeInput={handleChangeInput}
        handleChangeSelect={handleChangeSelect}
        errorMessage={error}
      />
    </Container>
  );
};

export default Contact;
