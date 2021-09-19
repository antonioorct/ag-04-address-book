import { Link } from "react-router-dom";
import { Button, Container, Header } from "semantic-ui-react";
import routes from "../constants/routes";
import { useAppSelector } from "../store";

const Homepage = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);

  return (
    <Container className="homepage">
      <Header as="h1">Welcome to the Agency04 address book!</Header>
      <Header as="h4">Made by Antonio Orct</Header>

      {isAuthenticated ? (
        <Link to={routes.addressBook.href}>
          <Button color="blue">Go to address book</Button>
        </Link>
      ) : (
        <Link to={routes.login.href}>
          <Button color="blue">Login</Button>
        </Link>
      )}
    </Container>
  );
};

export default Homepage;
