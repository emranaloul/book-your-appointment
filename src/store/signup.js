import axios from 'axios';
import cookie from 'react-cookies'
import jwt from 'jsonwebtoken'

import { createSlice } from "@reduxjs/toolkit";
let token = cookie.load('token');
let user = cookie.load('user')
let signup = createSlice({
    name: 'signup',
    initialState: {registered: false,loggedIn:user?true:  false,  token:token? token: null, activeUser:user? user: null},
    reducers:{
         addUser(state,action){
            if(action.payload.token){
              cookie.save('token', action.payload.token) 
              return  {...state,registered: true, token: action.payload}
            } else if(action.payload.toString().includes('duplicate')){
              return  {...state, registered: false, token: null, message: 'email already registered'}
            }
        }, 
         getUser(state,action){
        
          if(action.payload.token){
            cookie.save('token', action.payload.token)
            return {...state, loggedIn: true, token:action.payload.token }
           
          } else{
              return {...state, message:action.payload.message}
          }
      },
      setUserDetails(state,action){
          console.log("🚀 ~ file: signup.js ~ line 31 ~ setUserDetails ~ action", action.payload)
          let data = action.payload
          delete data[0].password
          cookie.save('user',data)
          return {...state, activeUser:data[0], loggedIn:true, token: data[1]}
      },
      logout(state,action){
  
        cookie.remove('token')
        cookie.remove('user')
        cookie.remove('sellers')
        cookie.remove('appointments')
         window.location = '/'
        return {registered: false,loggedIn: false,  token: null, activeUser: null}
      }
    },

})

export const signupHandler = (payload) => (dispatch,state) => {
    return axios({
        method: 'post',
        url: `${process.env.REACT_APP_API}/signup`,
        data: payload
    })
    .then(res => {
    dispatch(addUser(res.data));
   })
   .catch(err => {throw new Error(err.message)});
}

export const signinHandler = payload => (dispatch,state) => {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_API}/signin`,
    data: payload,
      headers:{Authorization:` Basic ${btoa(`${payload.email}:${payload.password}`)}`}

})
.then(res => {
  if(res.status === 200){
    dispatch(getUser(res.data));
  } else {
    dispatch(getUser({message: 'wrong email or password'}))
  }
 })
 .catch(e=> {throw new Error(e.message)});
}

export const checkAuth = payload => (dispatch,state)=>{
  return axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/getUser`,
      headers:{Authorization:` Bearer ${payload}`}
    }).then(response => {
      dispatch(setUserDetails([response.data,payload]))
    }) 
}

export const logoutHandler = payload => (dispatch,state)=>{
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/logout`,
    headers:{Authorization:` Bearer ${payload}`}
  }).then(() => {
    console.log("🚀 ~ file: signup.js ~ line 105 ~ logout", logout)
    dispatch(logout())
  }) 
}


export default signup.reducer 
export const {addUser,getUser,setUserDetails,logout} = signup.actions

