import { FC } from "react";
import AddressBook from "../views/AddressBook";
import Contact from "../views/Contact";
import ContactDetails from "../views/ContactDetails";
import FavoritedAddressBook from "../views/FavoritedAddressBook";
import Homepage from "../views/Homepage";
import Login from "../views/Login";
import NotFound from "../views/NotFound";

export interface IRoute {
  name: string;
  href: string;
  component: FC;
  protected: boolean;
}

interface IRoutes {
  homepage: IRoute;
  login: IRoute;
  addressBook: IRoute;
  favoritedAddressBook: IRoute;
  contact: IRoute;
  contactDetails: IRoute;

  notFound: IRoute;
}

const routes: IRoutes = {
  homepage: {
    component: Homepage,
    href: "/",
    name: "Homepage",
    protected: false,
  },
  login: {
    component: Login,
    href: "/login",
    name: "Login",
    protected: false,
  },
  addressBook: {
    component: AddressBook,
    href: "/adresar",
    name: "Address book",
    protected: true,
  },
  favoritedAddressBook: {
    component: FavoritedAddressBook,
    href: "/adresar/omiljeni",
    name: "Favorited address book",
    protected: true,
  },
  contact: {
    component: Contact,
    href: "/kontakt",
    name: "Contact",
    protected: true,
  },
  contactDetails: {
    component: ContactDetails,
    href: "/kontakt/detalji/:id",
    name: "Contact details",
    protected: true,
  },
  notFound: {
    name: "404",
    href: "*",
    component: NotFound,
    protected: false,
  },
};

export default routes;
