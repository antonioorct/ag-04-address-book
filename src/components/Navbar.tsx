import { Link, useHistory } from "react-router-dom";
import { Button, Container, Header } from "semantic-ui-react";
import routes from "../constants/routes";
import LocalStorage from "../utils/LocalStorage";

const Navbar = () => {
  const history = useHistory();

  const handleClickLogout = () => {
    LocalStorage.removeUsername();

    history.push(routes.login.href);
  };

  return (
    <nav>
      <Container>
        <div>
          <Header as="h3">Agency04 address book</Header>
          <Link to={routes.addressBook.href}>
            <Button>Adresar</Button>
          </Link>
          <Link to={routes.favoritedAddressBook.href}>
            <Button>Favorites</Button>
          </Link>
        </div>

        <hr />

        <div>
          <span>Welcome {LocalStorage.getUsername()}!</span>
          <Button onClick={handleClickLogout}>Log out</Button>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
