import { ChangeEvent, useEffect, useState } from "react";
import { Container, Form, Input } from "semantic-ui-react";
import AddressTable from "../components/AddressTable";
import { IContact } from "../constants/types";
import {
  countFavoritedContacts,
  getFavoritedContacts,
  updateContact,
} from "../services/contactServices";

const FavoritedAddressBook = () => {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [activePage, setActivePage] = useState(1);
  const [totalContactsCount, setTotalContactsCount] = useState(0);
  const [maxContactsPerPage, setMaxContactsPerPage] = useState(15);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => setTotalContactsCount(await countFavoritedContacts(search)))();
    fetch(maxContactsPerPage, 0);
  }, []);

  const fetch = async (limit: number, activePage: number) => {
    const newContacts = await getFavoritedContacts(limit, activePage, search);

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
    setTotalContactsCount(await countFavoritedContacts(search));
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
      <Form onSubmit={handleSubmit}>
        <Input
          value={search}
          onChange={handleChangeInput}
          name="search"
          placeholder="Search..."
        />
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

export default FavoritedAddressBook;
