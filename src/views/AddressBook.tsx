import { ChangeEvent, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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

  const location = useLocation();

  const favoritesOnly = () =>
    location.pathname === routes.favoritedAddressBook.href;

  useEffect(() => {
    (async () => {
      const contactCount = await countContacts({
        favoritesOnly: favoritesOnly(),
      });

      setTotalContactsCount(contactCount);
    })();

    fetchContacts(maxContactsPerPage, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchContacts = async (maxContacts: number, activePage: number) => {
    const newContacts = await getAllContacts({
      limit: maxContacts,
      offset: activePage - 1,
      searchTerm: search,
      favoritesOnly: favoritesOnly(),
    });

    setContacts(newContacts);
  };

  const handlePageChange = (activePage: number) => {
    setActivePage(activePage);
    fetchContacts(maxContactsPerPage, activePage);
  };

  const handleChangeSelect = (maxContacts: number) => {
    setActivePage(1);
    setMaxContactsPerPage(maxContacts);
    fetchContacts(maxContacts, 1);
  };

  const handleChangeInput = ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => setSearch(value);

  const handleSubmit = async () => {
    const contactCount = await countContacts({
      searchTerm: search,
      favoritesOnly: favoritesOnly(),
    });

    setTotalContactsCount(contactCount);

    setActivePage(1);

    fetchContacts(maxContactsPerPage, 1);
  };

  const handleClickFavorite = async (contact: IContact, favorited: boolean) => {
    const updatedContact: IContact = { ...contact, favorited };
    await updateContact(updatedContact);

    setContacts(
      contacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit} className="table-header">
        <div>
          <Input
            value={search}
            onChange={handleChangeInput}
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
