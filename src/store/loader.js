import { createSlice } from "@reduxjs/toolkit";

const loader = createSlice({
    name: 'loader',
    initialState: true,
    reducers: {
        loaderOff(){
            return false
        }, 
        loaderOn(){
            return true
        }
    }
})

export default loader.reducer

export const {loaderOff,loaderOn} = loader.actions