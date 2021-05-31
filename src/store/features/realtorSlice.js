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
  async (realtorId = 0, { getState, dispatch }) => {
    let response;
    try {
      response = await axios.get(`${process.env.REACT_APP_BASE_URL}/realtors/`);
    } catch (err) {
      //
    }
    if (!getState().realtorSlice.currentRealtor || realtorId) {
      const realtors = response.data;
      let realtor = realtors[0];
      if (realtorId) {
        const foundRealtor = realtors.filter((item) => item.id.toString() === realtorId)[0];
        realtor = foundRealtor || realtor;
      }
      dispatch({ type: "realtor/setCurrentRealtor", payload: realtor });
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
      state.error = "";
      state.realtors = action.payload;
    },
    [fetchRealtors.rejected]: (state) => {
      state.isLoading = false;
      state.error = "failed to load realtors";
    },
    [fetchRealtors.pending]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
  },
});

export const {
  setRealtors, setCurrentRealtor,
} = realtorSlice.actions;

const selectCurrentRealtor = (state) => state.realtorSlice.currentRealtor;
const selectRealtors = (state) => state.realtorSlice.realtors;
const selectUnreadMessageNumber = (state) => (state.realtorSlice.currentRealtor ? state.realtorSlice.currentRealtor.unread_messages : "");
const selectError = (state) => state.realtorSlice.error;

export {
  selectCurrentRealtor, selectError, selectRealtors, selectUnreadMessageNumber,
};

export default realtorSlice.reducer;
