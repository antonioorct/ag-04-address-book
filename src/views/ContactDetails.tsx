import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button, Card, Container, Header } from "semantic-ui-react";
import routes from "../constants/routes";
import { IContact } from "../constants/types";
import { deleteContact, getContactById } from "../services/contactServices";

const ContactDetails = () => {
  const [contact, setContact] = useState<IContact | null>();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const contact = await getContactById(id);

      setContact(contact);
    })();
  }, [id]);

  const handleClickDelete = async () => {
    await deleteContact(id);

    history.push(routes.addressBook.href);
  };

  const handleClickUpdate = async () => {
    history.push(routes.contact.href, { contact });
  };

  const renderCard = (title: string, content: string) => (
    <Card>
      <Card.Content>
        <Card.Meta>{content}</Card.Meta>
        <Card.Header>{title}</Card.Header>
      </Card.Content>
    </Card>
  );

  return !contact ? (
    <div></div>
  ) : (
    <Container>
      <Header as="h1">Contact details</Header>

      <Card.Group>
        {renderCard(id, "ID")}
        {renderCard(contact.firstName, "First name")}
        {renderCard(contact.lastName, "Last name")}
        {renderCard(
          new Date(contact.dateOfBirth).toLocaleDateString(),
          "Date of birth"
        )}
        {renderCard(contact.type, "Contact method")}
        {renderCard(contact.contact, "Contact")}
        {renderCard(contact.favorited ? "Yes" : "No", "Favorited")}
      </Card.Group>

      <div className="contact-managment-buttons">
        <Button positive onClick={handleClickUpdate}>
          Update
        </Button>

        <Button negative onClick={handleClickDelete}>
          Delete
        </Button>
      </div>
    </Container>
  );
};

export default ContactDetails;
