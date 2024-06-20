import "primereact/resources/themes/bootstrap4-light-blue/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";   
import "primeflex/primeflex.css";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button'

function Read() {
    const {Order_id} = useParams();
    const [customer,setCustomer] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:3030/read/${Order_id}`)
        .then(res =>   setCustomer(res.data[0]))
        .catch(err => console.log(err))
    },[Order_id])

    const history = useNavigate();

    return (
        <>
            <Card title="Customer Details" style={{width:'50%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', borderWidth: '2px', borderColor: '#ddd', borderStyle: 'solid',}}>
                <h3 className="m-0 p-3">Order_id:</h3>
                    <p className="m-0 p-3">{customer.Order_id}</p>
                <h3 className="m-0 p-3">Name:</h3>
                    <p className="m-0 p-3">{customer.Name}</p>
                <h3 className="m-0 p-3">Address:</h3>
                    <p className="m-0 p-3">{customer.Address}</p>
                <h3 className="m-0 p-3">Food_items:</h3>
                    <p className="m-0 p-3">{customer.Food_items}</p>
                <h3 className="m-0 p-3">Payment Method:</h3>
                    <p className="m-0 p-3">{customer.Payment}</p><br/>
                <Button style={{"width":"30%"}} label="BACK" onClick={() => history('/')} />
            </Card>
        </>
    )
}
export default Read
