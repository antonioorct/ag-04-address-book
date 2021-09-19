import { ChangeEvent, MouseEvent, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import {
  DropdownItemProps,
  Icon,
  Pagination,
  PaginationProps,
  Select,
  Table,
} from "semantic-ui-react";
import {
  IContact,
  ISortAction,
  ISortState,
  SortActionType,
} from "../constants/types";
import Input from "./shared/Input";

interface AddressTableProps {
  contacts: IContact[];
  totalContactsCount: number;
  maxContactsPerPage: number;
  activePage: number;

  handlePageChange(activePage: number): void;
  handleChangeSelect(value: number): void;
  handleClickFavorite(contact: IContact, favorite: boolean): void;
}

const PAGINATION_OPTIONS = [
  { key: "0", text: "15", value: "15" },
  { key: "1", text: "30", value: "30" },
  { key: "2", text: "45", value: "45" },
];

const initialReducerState: ISortState = {
  column: undefined,
  data: [],
  direction: undefined,
};

function sortReducer(state: ISortState, action: ISortAction): ISortState {
  switch (action.type) {
    case SortActionType.ChangeSort:
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === "ascending" ? "descending" : "ascending",
        };
      }

      return {
        column: action.column,
        data:
          action.column === "favorited"
            ? sortFavoritedContacts(state.data)
            : sortContacts(state.data, action.column ?? "lastName"),
        direction: "descending",
      };
    case SortActionType.Initialize:
      return {
        column: undefined,
        data: action.data,
        direction: undefined,
      };
    default:
      throw new Error();
  }
}

const sortContacts = (
  contacts: IContact[],
  column: keyof Omit<IContact, "favorited">
) =>
  contacts.sort((first, second) => first[column].localeCompare(second[column]));

const sortFavoritedContacts = (contacts: IContact[]) => [
  ...sortContacts(
    contacts.filter((contact) => contact.favorited),
    "lastName"
  ),
  ...sortContacts(
    contacts.filter((contact) => !contact.favorited),
    "lastName"
  ),
];

const AddressTable = ({
  contacts,
  totalContactsCount,
  maxContactsPerPage,
  activePage,
  handlePageChange,
  handleChangeSelect,
  handleClickFavorite,
}: AddressTableProps) => {
  const onPageChange = (
    _: MouseEvent<HTMLAnchorElement>,
    { activePage }: PaginationProps
  ) => activePage && handlePageChange(+activePage);

  const onChangeSelect = (
    _: ChangeEvent<HTMLDivElement>,
    { value }: DropdownItemProps
  ) => value && handleChangeSelect(+value);

  const [{ column, data, direction }, dispatch] = useReducer(
    sortReducer,
    initialReducerState
  );

  useEffect(() => {
    dispatch({
      type: SortActionType.Initialize,
      column: undefined,
      data: [...contacts],
      direction: undefined,
    });
  }, [contacts]);

  const renderHeaderCell = (
    columnName: keyof Omit<IContact, "favorited">,
    cellContent: string
  ) => (
    <Table.HeaderCell
      sorted={column === columnName ? direction : undefined}
      onClick={() =>
        dispatch({ type: SortActionType.ChangeSort, column: columnName })
      }
      content={cellContent}
    />
  );

  const renderCell = (cellContent: string, contactId: string) => (
    <Table.Cell>
      <Link to={`/kontakt/detalji/${contactId}`}>{cellContent}</Link>
    </Table.Cell>
  );

  return (
    <Table celled striped selectable sortable fixed>
      <Table.Header>
        <Table.Row>
          {renderHeaderCell("firstName", "First name")}
          {renderHeaderCell("lastName", "Last name")}
          {renderHeaderCell("contact", "Contact method")}
          {renderHeaderCell("dateOfBirth", "Date of Birth")}
          <Table.HeaderCell
            width={1}
            className="favorite-column"
            sorted={column === "favorited" ? direction : undefined}
            onClick={() =>
              dispatch({ type: SortActionType.ChangeSort, column: "favorited" })
            }
          >
            <Icon name="star outline" />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((contact: IContact) => (
          <Table.Row key={contact.id}>
            {renderCell(contact.firstName, contact.id)}
            {renderCell(contact.lastName, contact.id)}
            {renderCell(`${contact.contact} (${contact.type})`, contact.id)}
            {renderCell(
              new Date(contact.dateOfBirth).toLocaleDateString(),
              contact.id
            )}
            <Table.Cell className="favorite-column">
              <Icon
                name={contact.favorited ? "star" : "star outline"}
                onClick={() => handleClickFavorite(contact, !contact.favorited)}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>

      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan="5">
            <Input
              control={Select}
              options={PAGINATION_OPTIONS}
              onChange={onChangeSelect}
              value={maxContactsPerPage.toString()}
            />

            <Pagination
              activePage={activePage}
              totalPages={Math.ceil(totalContactsCount / maxContactsPerPage)}
              onPageChange={onPageChange}
            />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default AddressTable;
