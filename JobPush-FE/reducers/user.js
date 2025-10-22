import { createSlice } from "@reduxjs/toolkit";
import Applications from "../components/Applications";

const initialState = {
  token: null, // Valeur initiale du token
  keepConnected: false,
  profile: {
    name: null,
    firstName: null,
    email: null,
    phoneNumber: null,
    address: [
      { streetNumber: null, streetName: null, city: null, zipCode: null },
    ],
    preferences: [
      {
        contractType: null,
        remote: null,
        jobTitle: null,
        sector: null,
        cityJob: null,
        region: null,
        _id: null,
      },
    ],
    alerts: null,
    favorites: [],
    applications: [],
  },
};

export const userSlice = createSlice({
  name: "user", // Nom du reducer à exporter
  initialState,
  // Fonctions à importer dans les composants pour agir sur le reducer
  reducers: {
    updateUser: (state, action) => {
      state.profile = action.payload;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
    signup: (state, action) => {
      state.profile.favorites = [];
    },
    addFavorite: (state, action) => {
      state.profile.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.profile.favorites = state.profile.favorites.filter(
        (e) => e !== action.payload
      );
    },
    addApplication: (state, action) => {
      state.profile.applications.push(action.payload);
    },
    removeApplication: (state, action) => {
      state.profile.applications = state.profile.applications.filter(
        (e) => e !== action.payload
      );
    },
    addPreference: (state, action) => {
      state.profile.preferences.push(action.payload);
    },
    removePreference: (state, action) => {
      state.profile.preferences = state.profile.preferences.filter(
        (e, i) => e._id !== action.payload
      );
    },
    addAddress: (state, action) => {
      state.profile.address.push(action.payload);
    },
    setKeepConnected: (state, action) => {
      state.keepConnected = action.payload;
    },
  },
});

export const {
  updateUser,
  updateToken,
  addAddress,
  addFavorite,
  removeFavorite,
  removePreference,
  addApplication,
  removeApplication,
  addPreference,
  setKeepConnected,
  signup,
} = userSlice.actions;
export default userSlice.reducer;
