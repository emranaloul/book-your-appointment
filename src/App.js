import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signin from './components/signin';
import Signup from './components/signup'
import Requests from './context/requests'
import Home from './components/home'
import Sellers from './components/seller'
import Acl from './components/acl'
import AdminRequests from './components/adminrequest'
import React, {useState,useEffect} from 'react';
import jwt from 'jsonwebtoken'
import cookie from 'react-cookies'
import {checkAuth} from './store/signup'
import { getSellerHandler } from './store/sellers';
import { connect, useDispatch, useSelector } from "react-redux";
import {loaderOff, loaderOn} from './store/loader'
import {If, Then, Else} from 'react-if'
import Seller from './components/sellerId'
import Myrequests from './components/myrequest'
import {getAppointmentsHandler} from './store/appointment'
function App(props) {
 let token = cookie.load('token')
 const user = jwt.decode(token);
 useEffect(()=>{
   if (user && token && !props.user.loggedIn) {
     props.checkAuth(token)
    }
    // if(props.user.token){
    //   props.getAppointmentsHandler(props.user.token)
    //   props.getSellerHandler(token)

    // }
   props.loaderOff()
},[])

// useEffect(()=>{
  //   if(props.user.loggedIn && !props.seller){
    //     props.getSellerHandler(props.user.token)
    //     props.getAppointmentsHandler(props.user.token)
    //   }
    // },[props.user.loggedIn])
    return (
      
      // <AuthProvider>
      //  </AuthProvider>
      
        <If condition={props.loader}>
          <Then>
            <div>Loading...</div>
          </Then>
          <Else>
    <Router>
      <Header/>
    <Switch>
      <Route exact path="/">
        <Home/>
        <If condition={props.user.activeUser?props.user.activeUser.role === 'buyer': false}>
          <Then>
          <Sellers/>

          </Then> 
          <Else>
        <AdminRequests/>
            </Else>

        </If>
      </Route>
      <Route exact path='/signin'>
      <Signin/>
      </Route>

      <Route exact path='/seller/:id'>
        <Seller/>
      </Route>
      {/* <Route exact path='/adminrequest'>
     
      <AdminRequests/>
     
      </Route> */}
      <Route exact path='/signup'>
        <Signup/>
      </Route>
      <Route exact path='/myrequests'>
        <Myrequests/>
      </Route>
    </Switch>
    </Router>

          </Else>
        </If>
     
  );
}

// export default App;
const mapStateToProps = (state) => ({
  user: state.user,
  loader: state.loader,
  seller: state.seller
});

const mapDispatchToProps = { checkAuth,getSellerHandler, loaderOff, getAppointmentsHandler };

export default connect(mapStateToProps, mapDispatchToProps)(App);