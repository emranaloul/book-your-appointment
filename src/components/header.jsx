import React, { useEffect, useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./header.css";
import { If, Else, Then } from "react-if";
import { AuthContext } from "../context/auth";
import Acl from './acl'
import { connect, useDispatch, useSelector } from "react-redux";
import {logoutHandler} from '../store/signup'
const Header = (props) => {
  const context = useContext(AuthContext);

  const dispatch = useDispatch()

  const handleLogout = (e) => {
    e.preventDefault();
    if(props.user.token){
      props.logoutHandler(props.user.token)
    }
    
   
  }
  return (
    <>
      <div id="header">
        <Link to="/">
          <img
            id="logo"
            src="https://b.top4top.io/p_2187x73371.png"
            alt="LOGO"
          />
        </Link>
        {/* <Acl role={props.user.role}>
        <Link to="/adminrequest">
          <Button id="myrequests" variant="success">
            Sellers Requests
          </Button>

        </Link>
        </Acl> */}
        <div>
          <If condition={props.user.loggedIn}>
            <Then>
              <If condition={props.user.activeUser? props.user.activeUser.role === 'buyer': false}>
                <Then>
              <Link to="/myrequests">
                <Button id="myrequests" variant="success">
                  My Appointments
                </Button>
              </Link>

                </Then>
              </If>
              <Button id="signin" variant="light" onClick={handleLogout}>
                logout
              </Button>
            </Then>
            <Else>
              <Link to="/signin">
                <Button id="signin" variant="light">
                  Signin
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="success">Register</Button>{" "}
              </Link>
            </Else>
          </If>
          {/* <button id="signin">signin</button>
                    <button id="signup">New Property</button> */}
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = { logoutHandler };

export default connect(mapStateToProps,mapDispatchToProps)(Header);
// export default Header;
