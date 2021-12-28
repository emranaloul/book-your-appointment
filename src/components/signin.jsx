import React, { useEffect, useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import './signin.css'
import { AuthContext } from "../context/auth";
import {If, Then , Else } from "react-if";
import { Redirect } from "react-router";
import {signinHandler} from '../store/signup'
import { connect, useDispatch, useSelector } from "react-redux";
import { RootState } from '../store'

const Signin = (props) => {
  const dispatch = useDispatch()
 
  const handleSignin = e =>{
    e.preventDefault()

    let data ={
      email:e.target.formBasicEmail.value, 
      password:e.target.formBasicPassword.value
    }
    props.signinHandler(data)
   
    
  }
  return (
    <>
    <If condition={props.user.loggedIn}>
      <Then>
        <Redirect to='/'/>
      </Then>
      <Else>
      <Form id="signinform" onSubmit={handleSignin}>
        <fieldset>
          <legend>Signin</legend>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="username" placeholder="Enter Username" />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Signin
        </Button>
          </fieldset>
      </Form>
      </Else>
    </If>
    </>
  );
};


const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = { signinHandler };

export default connect(mapStateToProps, mapDispatchToProps)(Signin);

// export default Signin;