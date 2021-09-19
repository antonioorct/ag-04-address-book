import { Redirect, Route, RouteProps } from "react-router-dom";
import routes from "../constants/routes";
import { useAppSelector } from "../store";
import Navbar from "./Navbar";

interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<RouteProps>;
}

const ProtectedRoute = ({
  component: Component,
  ...props
}: ProtectedRouteProps) => {
  const { isAuthenticated } = useAppSelector((state) => state.user);

  return (
    <Route
      {...props}
      render={(props) =>
        isAuthenticated ? (
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
};

export default ProtectedRoute;
