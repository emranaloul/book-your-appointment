import React, { useEffect, useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { add } from "../store/signup";
import { If, Then, Else } from "react-if";
import "./signup.css";
import { AuthContext } from "../context/auth";
import { Redirect } from "react-router";
import Popup from "./popup";
import { signupHandler } from "../store/signup";

const Signup = (props) => {
  // const context = useContext(AuthContext);
  // console.log("🚀 ~ file: signup.jsx ~ line 10 ~ Signup ~ context", context);
  // const dispatch = useDispatch();
  // const state = useSelector(mapStateToProps);
const [ userType, setUserType] = useState('')
  let handleSignup = (e) => {
    console.log("🚀 ~ file: signup.jsx ~ line 36 ~ handleSignup ~ e", e.target)
    e.preventDefault();
    

    const data = {
      email: e.target.formBasicEmail.value,
      password: e.target.formBasicPassword.value,
      role: e.target.group1.value,
      firstName: e.target.formBasicFirstName.value,
      lastName: e.target.formBasicLastName.value,
      commercialName:e.target.formBasicCommercialName? e.target.formBasicCommercialName.value : null,
      service_type: e.target.formBasicServiceType? e.target.formBasicServiceType.value : null,
      description: e.target.formBasicDescription? e.target.formBasicDescription.value : null
    };
    props.signupHandler(data)
    // context.signup(
    //   e.target.formBasicEmail.value,
    //   e.target.formBasicPassword.value,
    //   e.target.group1.value
    // );
  };

  const handleChange = (e) => {
    console.log(
      "🚀 ~ file: signup.jsx ~ line 41 ~ handleChange ~ e",
      e.target.value
    );
    setUserType(e.target.value)
  };

  // useEffect(()=>{

  // }, )
  return (
    <>
      <If condition={!props.user.registered}>
        <Then>
          <Form id="signupform" onSubmit={handleSignup}>
            <fieldset>
              <legend>Signup</legend>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="username" placeholder="Enter Username" required/>
                {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" required/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Control placeholder="First name" required/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Control placeholder="Last name" required/>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="formBasicCheckbox"
                onChange={handleChange}
              >
                <Form.Check
                  inline
                  label="Buyer"
                  name="group1"
                  type="radio"
                  id={`House-Owner`}
                  value="buyer"
                />
                <Form.Check
                  inline
                  label="Seller"
                  name="group1"
                  type="radio"
                  id={`Admin`}
                  value="seller"
                />
              </Form.Group>
              <If condition={userType === 'seller'}>
                <Then>
              <Form.Group
                className="mb-3"
                controlId="formBasicCommercialName"
              >
              <Form.Control placeholder="Commercial Name" required/>

              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicServiceType">
                <Form.Control placeholder="Service Type" required/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Control
                  as="textarea"
                  placeholder="Service Description"
                  style={{ height: "100px" }}
                  required
                />
              </Form.Group>

                </Then>
              </If>
              <Button variant="success" type="submit">
                Signup
              </Button>
            </fieldset>
          </Form>
          <Popup
            show={props.user.message}
            title="Username already in use"
            message="Please use a different email"
          />
        </Then>
        <Else>
          <Redirect to="/signin" />
        </Else>
      </If>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = { signupHandler };

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
