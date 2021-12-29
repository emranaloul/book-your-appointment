import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import cookie from 'react-cookies'
let s = cookie.load('sellers')
let sellers = createSlice({
    name: 'sellers',
    initialState: s? s: [],
    reducers: {
        getSeller(state,action){
            let sellers = action.payload.map(seller => {
                delete seller.password
                delete seller.email
                delete seller.first_name
                delete seller.last_name
                return seller
            })
            cookie.save('sellers', sellers)
            return sellers
        }
    }
})

export const getSellerHandler = (payload) => (dispatch,state) =>{
    return axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API}/getSeller`,
        headers: {Authorization:` Bearer ${payload}`}
    }).then((response) =>{
        dispatch(getSeller(response.data))
    }).catch((error) =>{throw new Error(error.message)})
}
export default sellers.reducer
export const {getSeller} = sellers.actions