import "../constants/firebase";
import { get, push, set } from "firebase/database";
import {
  IContact,
  IContactCountOptions,
  IContactObject,
  IContactQueryOptions,
} from "../constants/types";
import { contactDatabaseRef, contactsDatabaseRef } from "../constants/firebase";

export const getAllContacts = async (
  options?: IContactQueryOptions
): Promise<IContact[]> => {
  const contacts = await get(contactsDatabaseRef);

  console.log(!contacts.val());

  if (!contacts.val()) return [];

  let contactArray: IContact[] = contactsToArray(contacts.val());

  if (!options) return contactArray;
  else {
    const { limit, offset, searchTerm, favoritesOnly } = options;

    if (searchTerm) contactArray = filterContacts(contactArray, searchTerm);
    if (favoritesOnly)
      contactArray = contactArray.filter((contact) => contact.favorited);

    return contactArray.slice(offset * limit, offset * limit + limit);
  }
};

export const getContactById = async (id: string): Promise<IContact | null> => {
  const contact = await get(contactDatabaseRef(id));

  return { id, ...contact.val() };
};

export const countContacts = async (
  options?: IContactCountOptions
): Promise<number> => {
  const contacts = await get(contactsDatabaseRef);

  if (!contacts.val()) return 0;

  let contactArray: IContact[] = contactsToArray(contacts.val());

  if (options) {
    const { searchTerm, favoritesOnly } = options;

    if (searchTerm) contactArray = filterContacts(contactArray, searchTerm);
    if (favoritesOnly)
      contactArray = contactArray.filter((contact) => contact.favorited);
  }

  return contactArray.length;
};

// Convert the queried database object to an array
export const contactsToArray = (contacts: IContactObject): IContact[] =>
  Object.keys(contacts).map((key) => ({
    id: key,
    ...contacts[key],
  }));

const SEARCH_FIELDS = ["firstName", "lastName", "contact"];
export const filterContacts = (
  contacts: IContact[],
  searchTerm: string
): IContact[] =>
  contacts.filter((contact) =>
    SEARCH_FIELDS.some((field) => {
      const value = contact[field as keyof IContact];

      if (typeof value !== "string") return false;
      return value.toLowerCase().includes(searchTerm.toLowerCase());
    })
  );

export const createContact = async (
  contact: Omit<IContact, "id" | "favorited">
): Promise<string | null> => {
  const newContactRef = push(contactsDatabaseRef);

  await set(newContactRef, { ...contact, favorited: false });

  return newContactRef.key;
};

export const updateContact = async ({
  id,
  ...contact
}: IContact): Promise<IContact> => {
  await set(contactDatabaseRef(id), contact);

  return { id, ...contact };
};

export const deleteContact = async (id: string) =>
  await set(contactDatabaseRef(id), null);
