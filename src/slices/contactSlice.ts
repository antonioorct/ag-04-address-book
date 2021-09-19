import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { IContact, IContactQueryOptions } from "../constants/types";
import { updateContact, getAllContacts } from "../services/contactServices";
import { RootState } from "../store";

export const contactAdapter = createEntityAdapter<IContact>({
  selectId: (contact) => contact.id,
});

export const getContacts = createAsyncThunk(
  "contacts/getContacts",
  async (options?: IContactQueryOptions) => await getAllContacts(options)
);

export const updateSingleContact = createAsyncThunk(
  "contacts/updateContact",
  async (contact: IContact) => await updateContact(contact)
);

export const contactSlice = createSlice({
  name: "contact",
  initialState: contactAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContacts.fulfilled, (state, { payload }) =>
        contactAdapter.setAll(state, payload)
      )
      .addCase(updateSingleContact.fulfilled, (state, { payload }) =>
        contactAdapter.updateOne(state, { changes: payload, id: payload.id })
      );
  },
});

export const { selectAll: selectContacts, selectById: selectContactsById } =
  contactAdapter.getSelectors<RootState>((state) => state.contact);

export const selectFavourited = createSelector([selectContacts], (contacts) =>
  contacts.filter((contact) => contact.favorited)
);

export default contactSlice.reducer;
