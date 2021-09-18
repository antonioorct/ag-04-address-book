export interface IContact {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  type: ContactType;
  contact: string;
  favorited: boolean;
}

export type ContactType = "Mobile" | "Home phone" | "E-mail" | "Pager" | "";

export interface ILoginFormState {
  username: string;
  password: string;
}

export interface IContactFormState {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  type: ContactType | "";
  contact: string;
}
