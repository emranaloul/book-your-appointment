import React, { useEffect, useState, useContext } from "react";
import "./myrequests.css";
import {updateAppointmentStatusHandler} from '../store/appointment';
import { If, Then, Else } from "react-if";
import { Redirect } from "react-router-dom";
import Acl from "./acl";
import { Button } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";

const AdminRequets = (props) => {
 
 

  const update = (e, r) => {
    e.preventDefault();
    let payload = {...r, token: props.user.token, status: e.target.action.value}
  
   props.updateAppointmentStatusHandler(payload)
  };

  

  return (
    <>
      <If condition={props.user.loggedIn}>
        <Then>
            <div id="table1">
              <tr>
                
                <th>Appointment</th>
                <th>Note</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
              {props.appointments
                ? props.appointments.map((request) => (
                  <tr>
                        <td>{request.appointment}</td>
                        <td>{request.note}</td>
                        <td>{request.status}</td>
                       
                        <td>

                          {/* <Button variant="success" onClick={update(request.id)}>update</Button>{" "}
                        <Button variant="danger" onClick={reject(request.id)}>Reject</Button>{" "} */}
                          <form
                            onSubmit={(e) => update(e, request)}
                          >
                            {/* <input type="hidden" id='id'>{request.id}</input> */}
                            <select id='action'>
                              <option value="approved">Approve</option>
                              <option value="rejected">Reject</option>
                            </select>
                            <button id='update'>Update</button>
                          </form>
                        </td>
                      </tr>
                  
                  ))
                : null}
            </div>
        </Then>
        <Else>
          <Redirect to="/" />
        </Else>
      </If>
    </>
  );
};


const mapStateToProps = (state) => ({
  user: state.user,
  sellers: state.seller,
  appointments: state.appointments,
});

const mapDispatchToProps = { updateAppointmentStatusHandler };

export default connect(mapStateToProps,mapDispatchToProps)(AdminRequets);