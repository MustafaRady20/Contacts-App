import { createSlice } from "@reduxjs/toolkit";

const modal = createSlice({
    name: "modal",
    initialState: {
        isOpen: false,
        componentName: "",
        data: {}
    },
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true;
            state.componentName = action.payload.componentName
            state.data = action.payload.data

        },
        closeModal: (state) => {
            state.isOpen = false
            state.componentName = ""
            state.data = {}
        }
    }

})


export const { openModal, closeModal } = modal.actions

export default modal.reducer