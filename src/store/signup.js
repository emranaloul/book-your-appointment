import axios from 'axios';
import cookie from 'react-cookies'
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
            } else{
              return {...state, ...action.payload}
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
          let data = action.payload
          delete data[0].password
          cookie.save('user',data[0])
          return {...state, activeUser:data[0], loggedIn:true, token: data[1]}
      },
      logout(state,action){
  
        cookie.remove('token')
        cookie.remove('user')
        cookie.remove('sellers')
        cookie.remove('appointments')
         window.location = '/'
        return {registered: false,loggedIn: false,  token: null, activeUser: null}
      },
      deleteMessage(state,action){
        let x = state
        delete x.message
        return x
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
      if(res.data.id){
        dispatch(addUser(res.data))
      } else {
      dispatch(addUser({message: 'User already exists'}))
    }
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
    dispatch(getUser({message: res.data}))
  }
 })
 .catch(() => dispatch(getUser({message: 'wrong email or password'})));
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
export const {addUser,getUser,setUserDetails,logout, deleteMessage} = signup.actions

