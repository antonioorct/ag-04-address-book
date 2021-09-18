import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Form, Icon, Input } from "semantic-ui-react";
import AddressTable from "../components/AddressTable";
import routes from "../constants/routes";
import { IContact } from "../constants/types";
import {
  countContacts,
  getAllContacts,
  updateContact,
} from "../services/contactServices";

const AddressBook = () => {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [activePage, setActivePage] = useState(1);
  const [totalContactsCount, setTotalContactsCount] = useState(0);
  const [maxContactsPerPage, setMaxContactsPerPage] = useState(15);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => setTotalContactsCount(await countContacts(search)))();
    fetch(maxContactsPerPage, 0);
  }, []);

  const fetch = async (limit: number, activePage: number) => {
    const newContacts = await getAllContacts(limit, activePage, search);

    setContacts(newContacts);
  };

  const handlePageChange = (activePage: number) => {
    setActivePage(activePage);
    fetch(maxContactsPerPage, activePage - 1);
  };
  const handleChangeSelect = (value: number) => {
    setActivePage(1);
    setMaxContactsPerPage(value);
    fetch(value, 0);
  };

  const handleChangeInput = ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => setSearch(value);

  const handleSubmit = async () => {
    setActivePage(1);
    setTotalContactsCount(await countContacts(search));
    fetch(maxContactsPerPage, 0);
  };

  const handleClickFavorite = async (contact: IContact, favorited: boolean) => {
    const updatedContact: IContact = { ...contact, favorited };
    await updateContact(contact.id, updatedContact);

    setContacts(
      contacts.map((c) => (c.id === contact.id ? updatedContact : c))
    );
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit} className="table-header">
        <div>
          <Input
            value={search}
            onChange={handleChangeInput}
            name="search"
            placeholder="Search..."
          />
          <Button color="blue" attached="right" onClick={handleSubmit}>
            <Icon name="search" />
          </Button>
        </div>

        <Link to={routes.contact.href}>
          <Button positive type="button">
            New contact
          </Button>
        </Link>
      </Form>

      <AddressTable
        contacts={contacts}
        handlePageChange={handlePageChange}
        handleChangeSelect={handleChangeSelect}
        handleClickFavorite={handleClickFavorite}
        totalContactsCount={totalContactsCount}
        maxContactsPerPage={maxContactsPerPage}
        activePage={activePage}
      />
    </Container>
  );
};

export default AddressBook;
