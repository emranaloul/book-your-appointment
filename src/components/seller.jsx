import React, { useEffect, useState, useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { connect } from "react-redux";
import {Link} from "react-router-dom";


const Sellers = (props) => {

  let colors = [
    "Primary",
    "Secondary",
    "Success",
    "Danger",
    "Warning",
    "Info",
    "Light",
    "Dark",
  ];
const countHandler = (i, l) =>{
  if(i < 8){
    return i
  } else {
    let x = Math.ceil(((i - (l * Math.floor(i/l) - Math.floor(i/l)))/Math.floor(i/l) -1) * Math.floor(i/l))
    return x
  }
  
}
  
  return (

    <div className="sellers">
        {props.sellers?props.sellers.map((seller, idx) => 
    <Card
      bg={colors[countHandler(idx, colors.length)].toLowerCase()}
      key={idx}
      text={colors[countHandler(idx, colors.length)].toLowerCase() === "light" ? "dark" : "white"}
      style={{ width: "18rem" }}
      className="mb-2"
      >  <Card.Header>{seller.service_type}</Card.Header>
    <Card.Body>
      <Card.Title>{seller.commercial_name} </Card.Title>
      <Card.Text>
        {seller.description}
      </Card.Text>
    </Card.Body>
    <Link to={`/seller/${seller.id}`}>
  <Button variant={colors[(countHandler(idx, colors.length) + 1) < 8?(countHandler(idx, colors.length) + 1): 0].toLowerCase()}>Book an Appointment</Button>
        </Link>
  </Card>
        
        ): null}

    
    </div>
  );
};

const mapStateToProps = (state) => ({
    user: state.user,
    sellers: state.seller
  });

  export default connect(mapStateToProps)(Sellers);