export interface IContact {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  type: ContactType;
  contact: string;
  favorited: boolean;
}

export interface IContactObject {
  [id: string]: Omit<IContact, "id">;
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

export interface ISortState {
  column?: keyof IContact;
  data: IContact[];
  direction?: "ascending" | "descending";
}

export enum SortActionType {
  ChangeSort = "CHANGE_SORT",
  Initialize = "INITIALIZE",
}

export type ISortAction =
  | {
      type: SortActionType.Initialize;
      column?: keyof IContact;
      data: IContact[];
      direction?: "ascending" | "descending";
    }
  | {
      type: SortActionType.ChangeSort;
      column: keyof IContact;
    };

export interface IContactQueryOptions {
  limit: number;
  offset: number;
  searchTerm?: string;
  favoritesOnly?: boolean;
}

export interface IContactCountOptions {
  searchTerm?: string;
  favoritesOnly?: boolean;
}
