import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destinition: null,
    travelTimeInformation: null,
}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers : {
        setOrigin : (state , action) => {
            state.origin = action.payload;
        },
        setDestination : (state , action) => {
            state.destinition = action.payload;
        },
        setTravelTimeInformation : (state , action) => {
            state.travelTimeInformation = action.payload;
        },
    }
});

export const { setOrigin , setDestination , setTravelTimeInformation } = navSlice.actions;

//selector

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destinition;
export const selectTeavelTimeInformation = (state) => state.nav.travelTimeInformation

export default navSlice.reducer;

