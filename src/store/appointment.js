import axios from 'axios';
import { createSlice } from "@reduxjs/toolkit";
import cookie from 'react-cookies'


const a = cookie.load('appointments')

const appointments = createSlice({
    name: 'appointments',
    initialState: a? a: [],
    reducers:{
        getAppointments(state,action){
            cookie.save('appointments',[...state, ...action.payload])
            return [...state, ...action.payload]
        },

        addAppointment(state,action){
            cookie.save('appointments',[...state, action.payload])
            return [...state, action.payload]
        },
        deleteAppointment(state,action){
            let s = state
            let x = s.filter(val => val.id !== action.payload.id)
            cookie.save('appointments',x)
            return x
        },
        updateAppointment(state,action){
            let s = state
            let x = s.filter(val => val.id !== action.payload.id)
            cookie.save('appointments',[...x, action.payload])
            return [...x, action.payload]
        },
        updateAppointmentStatus(state,action){
            let s = state
            let x = s.filter(val => val.id !== action.payload.id)
            cookie.save('appointments',[...x, action.payload])
            return [...x, action.payload]
        },
        deleteMessageA(state,action){
            let x =state
            delete x[x.length - 1].message
            cookie.save('appointments',x)
            return x
        }
    },

})

export const getAppointmentsHandler = payload => (dispatch,state)=>{
    return axios({
        method: 'get',
        url: `${process.env.REACT_APP_API}/getAppointment`,
        headers: {Authorization:` Bearer ${payload}`}
    }).then(response=>{
        dispatch(getAppointments(response.data))
    })
}

export const addAppointmentHandler = payload => (dispatch,state)=>{
    return axios({
        method: 'post',
        url: `${process.env.REACT_APP_API}/createAppointment`,
        headers: {Authorization:` Bearer ${payload.token}`},
        data: payload
    }).then(response=>{
        dispatch(addAppointment(response.data))
    })
}

export const deleteAppointmentHandler = payload => (dispatch,state)=>{
    return axios({
        method: 'delete',
        url: `${process.env.REACT_APP_API}/deleteAppointment`,
        headers: {Authorization:` Bearer ${payload.token}`},
        data: payload.id
    }).then(response=>{
        dispatch(deleteAppointment(response.data))
    })
}

export const updateAppointmentHandler = payload => (dispatch,state)=>{
    return axios({
        method: 'put',
        url: `${process.env.REACT_APP_API}/updateAppointment`,
        headers: {Authorization:` Bearer ${payload.token}`},
        data: payload
    }).then(response=>{
        dispatch(updateAppointment(response.data))
    })
}

export const updateAppointmentStatusHandler = payload => (dispatch,state)=>{
    return axios({
        method: 'put',
        url: `${process.env.REACT_APP_API}/updateAppointmentStatus`,
        headers: {Authorization:` Bearer ${payload.token}`},
        data: payload
    }).then(response=>{
        dispatch(updateAppointmentStatus(response.data))
    })
}

export default appointments.reducer
export const {getAppointments,updateAppointmentStatus,updateAppointment,deleteAppointment, addAppointment,deleteMessageA} = appointments.actions