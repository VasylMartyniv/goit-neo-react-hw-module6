import { createSlice } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import { v4 } from "uuid";

const slice = createSlice({
  name: "contacts",
  initialState: {
    items: [
      { id: v4(), name: "Rosie Simpson", number: "459-12-56" },
      { id: v4(), name: "Hermione Kline", number: "443-89-12" },
      { id: v4(), name: "Eden Clements", number: "645-17-79" },
      { id: v4(), name: "Annie Copeland", number: "227-91-26" },
    ],
  },
  reducers: {
    addContact: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare({ name, number }) {
        return {
          payload: {
            name,
            number,
            id: v4(),
          },
        };
      },
    },
    deleteContact(state, action) {
      return {
        ...state,
        items: state.items.filter((itm) => itm.id !== action.payload),
      };
    },
  },
  selectors: {
    selectContacts: (state) => state.items,
    selectContactByIdx: (state, idx) => state.items[idx] ?? {},
  },
});

export const { addContact, deleteContact } = slice.actions;
export const { selectContacts, selectContactByIdx } = slice.selectors;

export default slice;
