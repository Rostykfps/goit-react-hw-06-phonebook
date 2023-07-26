import { createSlice } from '@reduxjs/toolkit';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  contacts: [],
  filter: '',
};

export const phoneBookSlice = createSlice({
  name: 'phoneBook',
  initialState,
  reducers: {
    createContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
    filterContacts: (state, action) => {
      state.filter = action.payload;
    },
  },
});

const persistConfig = {
  key: 'phoneBook',
  storage,
};

export const phoneBookReducer = persistReducer(
  persistConfig,
  phoneBookSlice.reducer
);

export const { createContact, deleteContact, filterContacts } =
  phoneBookSlice.actions;
