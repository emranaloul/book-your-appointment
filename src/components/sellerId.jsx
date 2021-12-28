import React , { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import {getAppointmentsHandler,addAppointmentHandler,deleteAppointmentHandler,updateAppointmentHandler} from '../store/appointment';


const Seller = props => {
    const {id} = useParams()
   let seller = props.sellers.filter(s=> s.id === id)[0]
    let time = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00','16:00', '17:00']

    const handleSubmit = e =>{
        e.preventDefault()
        let data= {
            token: props.user.token,
            buyer_id: props.user.activeUser.id,
            seller_id: id,
            appointment: `${e.target.date.value} ${e.target.time.value}`,
            note: e.target.note.value? e.target.note.value: null
        }
        
        props.addAppointmentHandler(data)
    }
    
    return(
        <div className="sellerId">
            <div className='sellerCard'>
            <h4>Service Type: {seller.service_type}</h4>
            <h5>Provider Name: {seller.commercial_name}</h5>
            <form className='sellerForm' onSubmit={handleSubmit}>
                <section>
                <input type="date" id='date' required/>
                <select id='time' required>
                    {time.map((val,i) =>
                        <option key={i} value={val}>{val}</option>
                    )}
                </select>

                </section>
               <input type='text' className='text' placeholder='Add your note' id='note'></input>                
                <button type="submit">Book</button>
            </form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    sellers: state.seller
  });

  const mapDispatchToProps = { addAppointmentHandler };

  export default connect(mapStateToProps,mapDispatchToProps)(Seller);