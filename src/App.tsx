import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import routes from "./constants/routes";

const getRoutes = (): React.ReactElement[] =>
  Object.keys(routes).map((key, index) => {
    const route = routes[key as keyof typeof routes];

    return route.protected ? (
      <ProtectedRoute
        key={index}
        path={route.href}
        component={route.component}
        exact
      />
    ) : (
      <Route key={index} path={route.href} component={route.component} exact />
    );
  });

const App = () => {
  return (
    <Router>
      <Switch>{getRoutes()}</Switch>
    </Router>
  );
};

export default App;
