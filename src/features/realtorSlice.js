/*
  common state
    selected realtor (id)
    unread messages number
    current message id ?
    isLoading
*/
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  realtors: [],
  currentRealtor: null,
  isLoading: false,
  error: "",
};

export const fetchRealtors = createAsyncThunk(
  "fetchRealtors",
  async (url = "", { getState, dispatch }) => {
    const response = await axios.get(`${url}/data/realtors.json`);
    if (!getState().realtorSlice.currentRealtor) {
      dispatch({ type: "realtor/setCurrentRealtor", payload: response.data[0] });
    }
    return response.data;
  },
);

const realtorSlice = createSlice({
  name: "realtor",
  initialState,
  reducers: {
    setRealtors: (state, action) => {
      state.realtors = action.payload;
    },
    setCurrentRealtor: (state, action) => {
      state.currentRealtor = action.payload;
    },
  },
  extraReducers: {
    [fetchRealtors.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.realtors = action.payload;
    },
    [fetchRealtors.rejected]: (state) => {
      state.isLoading = true;
      state.error = "failed to load realtors";
    },
    [fetchRealtors.pending]: (state) => {
      state.isLoading = true;
    },
  },
});

export const {
  setRealtors, setIsLoading, setError, setCurrentRealtor, setUnreadMessageQuantity,
} = realtorSlice.actions;

const selectCurrentRealtor = (state) => state.realtorSlice.currentRealtor;
const selectRealtors = (state) => state.realtorSlice.realtors;
const selectUnreadMessageNumber = (state) => (state.realtorSlice.currentRealtor ? state.realtorSlice.currentRealtor.unread_messages : "");

export { selectCurrentRealtor, selectRealtors, selectUnreadMessageNumber };

export default realtorSlice.reducer;
