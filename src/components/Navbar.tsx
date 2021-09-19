import { Link } from "react-router-dom";
import { Button, Container, Header } from "semantic-ui-react";
import routes from "../constants/routes";
import { logout } from "../slices/userSlice";
import { useAppDispatch, useAppSelector } from "../store";

const Navbar = () => {
  const { username } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleClickLogout = () => dispatch(logout());

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
          <span>Welcome {username}!</span>
          <Button onClick={handleClickLogout}>Log out</Button>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
