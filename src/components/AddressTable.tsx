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
import { IContact } from "../constants/types";
import Input from "./shared/Input";

const PAGINATION_OPTIONS = [
  { key: "0", text: "15", value: "15" },
  { key: "1", text: "30", value: "30" },
  { key: "2", text: "45", value: "45" },
];

interface AddressTableProps {
  contacts: IContact[];
  totalContactsCount: number;
  maxContactsPerPage: number;
  activePage: number;

  handlePageChange(activePage: number): void;
  handleChangeSelect(value: number): void;
  handleClickFavorite(contact: IContact, favorite: boolean): void;
}
function exampleReducer(state: any, action: any) {
  switch (action.type) {
    case "CHANGE_SORT":
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === "ascending" ? "descending" : "ascending",
        };
      }

      if (action.column === "favorited")
        return {
          column: action.column,
          data: sortFavorited(state.data, [action.column]),
          direction: "descending",
        };
      return {
        column: action.column,
        data: sort(state.data, action.column, action.direction),
        direction: "descending",
      };
    case "INITIALIZE":
      return {
        column: null,
        data: action.data,
        direction: null,
      };
    default:
      throw new Error();
  }
}

const sort = (contacts: any[], column: string, order: any) =>
  contacts.sort(
    (first, second) =>
      first[column].localeCompare(second[column]) *
      (order === "ascending" ? -1 : 1)
  );

const sortFavorited = (contacts: any[], order: any) => [
  ...sort(
    contacts.filter((contact) => contact.favorited),
    "lastName",
    order
  ),
  ...sort(
    contacts.filter((contact) => !contact.favorited),
    "lastName",
    order
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

  const [state, dispatch] = useReducer(exampleReducer, {
    column: null,
    data: [],
    direction: null,
  });

  const { column, data, direction } = state;

  useEffect(() => {
    dispatch({
      type: "INITIALIZE",
      column: null,
      data: [...contacts],
      direction: null,
    });
  }, [contacts]);

  return (
    <Table celled striped selectable sortable fixed>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            sorted={column === "firstName" ? direction : null}
            onClick={() =>
              dispatch({ type: "CHANGE_SORT", column: "firstName" })
            }
          >
            First name
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === "lastName" ? direction : null}
            onClick={() =>
              dispatch({ type: "CHANGE_SORT", column: "lastName" })
            }
          >
            Last name
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === "contact" ? direction : null}
            onClick={() => dispatch({ type: "CHANGE_SORT", column: "contact" })}
          >
            Contact method
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === "dateOfBirth" ? direction : null}
            onClick={() =>
              dispatch({ type: "CHANGE_SORT", column: "dateOfBirth" })
            }
          >
            Date of birth
          </Table.HeaderCell>
          <Table.HeaderCell
            width={1}
            className="favorite-column"
            sorted={column === "favorited" ? direction : null}
            onClick={() =>
              dispatch({ type: "CHANGE_SORT", column: "favorited" })
            }
          >
            <Icon name="star outline" />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((contact: IContact) => (
          <Table.Row key={contact.id}>
            <Table.Cell>
              <Link to={`/kontakt/detalji/${contact.id}`}>
                {contact.firstName}
              </Link>
            </Table.Cell>
            <Table.Cell>
              <Link to={`/kontakt/detalji/${contact.id}`}>
                {contact.lastName}
              </Link>
            </Table.Cell>
            <Table.Cell>
              <Link to={`/kontakt/detalji/${contact.id}`}>
                {`${contact.contact} (${contact.type})`}
              </Link>
            </Table.Cell>
            <Table.Cell>
              <Link to={`/kontakt/detalji/${contact.id}`}>
                {new Date(contact.dateOfBirth).toLocaleDateString()}
              </Link>
            </Table.Cell>
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
