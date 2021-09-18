import "../constants/firebase";
import { get, push, set } from "firebase/database";
import { IContact } from "../constants/types";
import { contactDatabaseRef, contactsDatabaseRef } from "../constants/firebase";

export const getAllContacts = async (
  limit: number,
  offset: number,
  searchTerm: string
): Promise<IContact[]> => {
  const contacts = await get(contactsDatabaseRef);

  // Converts the queried database object to an array of objects
  const contactArray: IContact[] = contactsToArray(contacts.val());

  return filterContacts(contactArray, searchTerm).slice(
    offset * limit,
    offset * limit + limit
  );
};

export const getFavoritedContacts = async (
  limit: number,
  offset: number,
  searchTerm: string
): Promise<IContact[]> => {
  const contacts = await get(contactsDatabaseRef);

  // Converts the queried database object to an array of objects
  const contactArray: IContact[] = contactsToArray(contacts.val());

  return filterContacts(contactArray, searchTerm)
    .filter((contact) => contact.favorited)
    .slice(offset * limit, offset * limit + limit);
};

export const getContactById = async (id: string): Promise<IContact | null> => {
  const contact = await get(contactDatabaseRef(id));

  return contact.val();
};

export const createContact = async (
  contact: Omit<IContact, "id" | "favorited">
): Promise<string | null> => {
  const newPostRef = push(contactsDatabaseRef);

  await set(newPostRef, { ...contact, favorited: false });

  return newPostRef.key;
};

export const updateContact = async (
  id: string,
  contact: IContact
): Promise<void> => await set(contactDatabaseRef(id), contact);

export const deleteContact = async (id: string) =>
  await set(contactDatabaseRef(id), null);

export const countContacts = async (searchTerm: string): Promise<number> => {
  const contacts = await get(contactsDatabaseRef);

  // Returns the length of the contact object's keys array
  // queried from the database
  const contactArray: IContact[] = contactsToArray(contacts.val());
  return filterContacts(contactArray, searchTerm).length;
};

export const countFavoritedContacts = async (
  searchTerm: string
): Promise<number> => {
  const contacts = await get(contactsDatabaseRef);

  // Returns the length of the contact object's keys array
  // queried from the database
  const contactArray: IContact[] = contactsToArray(contacts.val());
  return filterContacts(contactArray, searchTerm).filter(
    (contact) => contact.favorited
  ).length;
};

export const contactsToArray = (contacts: any): IContact[] =>
  Object.keys(contacts).map((key) => ({
    id: key,
    ...contacts[key],
  }));

const SEARCH_FIELDS = ["firstName", "lastName", "contact"];
export const filterContacts = (
  contacts: IContact[],
  filter: string
): IContact[] =>
  contacts.filter((contact) =>
    SEARCH_FIELDS.some((field) => {
      const value = contact[field as keyof IContact];

      if (typeof value !== "string") return false;
      // if (field === "contact" && contact.type === "E-mail")
      //   value.toLowerCase().includes(filter.toLowerCase());

      return value.toLowerCase().includes(filter.toLowerCase());
    })
  );
