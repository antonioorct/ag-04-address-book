import { Redirect, Route, RouteProps } from "react-router-dom";
import routes from "../constants/routes";
import LocalStorage from "../utils/LocalStorage";
import Navbar from "./Navbar";

interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<RouteProps>;
}

const ProtectedRoute = ({
  component: Component,
  ...props
}: ProtectedRouteProps) => (
  <Route
    {...props}
    render={(props) =>
      LocalStorage.getUsername() ? (
        <>
          <Navbar />
          <Component component={Component} {...props} />
        </>
      ) : (
        <Redirect to={routes.login.href} />
      )
    }
  />
);

export default ProtectedRoute;
