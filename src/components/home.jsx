import React, { useEffect} from "react";

import "./home.css";
import { If, Then, Else } from "react-if";
import { connect } from "react-redux";
import {getAppointmentsHandler} from '../store/appointment'
import { getSellerHandler } from '../store/sellers';
import {loaderOff, loaderOn} from '../store/loader';
import {checkAuth} from '../store/signup'

const Home = (props) => {
  
  
 
    useEffect(()=>{
    
       if(props.user.token && props.sellers.length === 0 && !props.user.ActiveUser) {
         
        props.checkAuth(props.user.token)
         props.getAppointmentsHandler(props.user.token)
         props.getSellerHandler(props.user.token)
   
       }
     
   },[])
  return (
    <>
      <If condition={props.user.loggedIn}>
     
        <Else>
          <div id="home">
            <img
              id="homeimg"
              src="https://s3-us-west-2.amazonaws.com/alexvalassidis.com/service.jpeg"
              alt="p"
            />
          </div>
        </Else>
      </If>
    </>
  );
};


const mapStateToProps = (state) => ({
  user: state.user,
  sellers: state.seller,
  appointments: state.appointments
});

const mapDispatchToProps = { getAppointmentsHandler,getSellerHandler,loaderOff,checkAuth };

export default connect(mapStateToProps,mapDispatchToProps)(Home);