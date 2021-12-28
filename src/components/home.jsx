import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth";
import { RequestContext } from "../context/requests";
import "./home.css";
import { If, Then, Else } from "react-if";
import { Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";
import Popup from "./popup";
import { connect, useDispatch, useSelector } from "react-redux";
import {getAppointmentsHandler} from '../store/appointment'
import { getSellerHandler } from '../store/sellers';
import {loaderOff, loaderOn} from '../store/loader';
import {checkAuth} from '../store/signup'

const Home = (props) => {
console.log("🚀 ~ file: home.jsx ~ line 11 ~ Home ~ props", props)
  const [submit, setSubmit] = useState(false);
  
  const handleSubmit = e =>{
    e.preventDefault();
      
      // let request  = {
      //   id: context2.requests.length + 1,
      //   username: context.user.username,
      //   name: e.target.inlineFormInputName.value, 
      //   address: e.target.formGridAddress1.value, 
      //   city: e.target.formGridCity.value,
      //   region: e.target.formGridZip.value, 
      //   rooms: e.target.formGridState.value, 
      //   condition: e.target.checkbox.checked? 'used' : 'new',
      //   description: e.target.floatingTextarea2.value, 
      //   status: 'pending'
      // }
      // context2.addRequest(request);
      document.getElementById('homeform2').reset()
      setSubmit(true)
    }
    useEffect(()=>{
    
       if(props.user.token && props.sellers.length === 0) {
       console.log("🚀 ~ file: home.jsx ~ line 40 ~ useEffect ~ !props.sellers", !props.sellers)
         
        props.checkAuth(props.user.token)
         props.getAppointmentsHandler(props.user.token)
         props.getSellerHandler(props.user.token)
   
       }
     
   },[])
  return (
    <>
      <If condition={props.user.loggedIn}>
        {/* <Then>
          <div id='homeform'>
            <Form onSubmit={handleSubmit} id='homeform2'>
                <fieldset>
                    <legend>House Details</legend>
               
              <Row className="mb-3">
                <Col sm={3} className="my-1">
                  <Form.Label htmlFor="inlineFormInputName">
                  House Owner 
                  </Form.Label>
                  <Form.Control
                    id="inlineFormInputName"
                    placeholder="Name"
                  />
                </Col>
              </Row>

              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="1234 Main St" />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>State/Region</Form.Label>
                  <Form.Control />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>How many rooms</Form.Label>
                  <Form.Select defaultValue="Choose...">
                    <option>Choose...</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Select>
                </Form.Group>

              </Row>

              <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check type="checkbox" label="Used House" id='checkbox' value='used' />
              </Form.Group>
              <FloatingLabel
                controlId="floatingTextarea2"
                label="House Description"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: "100px" }}
                />
              </FloatingLabel>
              <Button id='submit' variant="success" type="submit">
                Submit
              </Button>
              </fieldset>
            </Form>
          </div>
          <Popup show={submit} title='Request Sent' message='admin will approve/reject your request'/>
        </Then> */}
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

// export default Home;
const mapStateToProps = (state) => ({
  user: state.user,
  sellers: state.seller,
  appointments: state.appointments
});

const mapDispatchToProps = { getAppointmentsHandler,getSellerHandler,loaderOff,checkAuth };

export default connect(mapStateToProps,mapDispatchToProps)(Home);