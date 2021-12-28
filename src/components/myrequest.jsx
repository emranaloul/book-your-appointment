import React, { useEffect, useState, useContext } from "react";
import './myrequests.css'
import {If, Then , Else} from 'react-if'
import {Redirect} from 'react-router-dom'
import { connect, useDispatch, useSelector } from "react-redux";
import {getAppointmentsHandler,addAppointmentHandler,deleteAppointmentHandler,updateAppointmentHandler} from '../store/appointment'
const Myrequests = (props) => {


  let appointments = props.appointments.map(appointment =>{
    let seller = props.sellers.filter(seller => seller.id === appointment.seller_id);
    return {...appointment, service_type:seller[0].service_type, commercial_name: seller[0].commercial_name}
  })
 

  return (
    <>
    <If condition={props.user.loggedIn}>
        <Then>
    <div id='table'>
      <tr>
        <th>Provider Name</th>
        <th>Service Type</th>
        <th>Appointment</th>
        <th>Status</th>
        <th>Note</th>
      </tr>
      {appointments? appointments.map((request, i) => 
            <tr>
            <td>{request.commercial_name}</td>
            <td>{request.service_type}</td>
            <td>{request.appointment}</td>
            <td>{request.status}</td>
            <td>{request.note}</td>
          </tr>

      ): null}
        
    </div>

        </Then>
        <Else>
        <Redirect to='/' />
        </Else>
    </If>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  appointments: state.appointments,
  sellers: state.seller,
});
const mapDispatchToProps = { addAppointmentHandler,deleteAppointmentHandler,updateAppointmentHandler };
export default connect(mapStateToProps, mapDispatchToProps)(Myrequests);

// export default Myrequests;
