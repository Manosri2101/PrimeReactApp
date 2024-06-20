import React,{useState} from "react";
import axios from "axios"
import {v4 as uuid} from "uuid";
import {useNavigate } from "react-router-dom";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";   
import "primeflex/primeflex.css";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button'

function Create(){
    const[name, setName]=useState("");
    const[addr, setAddr]=useState("");
    const[food, setFood]=useState("");
    const[pay, setPay]=useState("");

    let history=useNavigate();

        const handleSubmit = (e) => {
            e.preventDefault();
    
            const Order_id = uuid().slice(0,8); 
            const newCustomer = {
                Order_id,
                Name: name,
                Address: addr,
                Food_items: food,
                Payment: pay
            };
    
            axios.post('http://localhost:3030/create', newCustomer)
                .then(res => {history("/");})
                .catch(err => console.log(err));
                alert("Record created successfully");
        }
    return(
        <>
            <div className="card">
                <h1 style={{"textAlign":"left"}}>Enter Details to Add: </h1>
                <form onSubmit={handleSubmit}>
                    <div className="p-field p-grid">
                        <label htmlFor="input" className="p-col-12 p-md-2">Name:</label><br/>
                            <div className="p-col- p-md-10">
                            <InputText style={{"width":"90%"}} id = "Name" name="Name" required onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
                            </div>
                    </div><br/><br/>
                    <div className="p-field p-grid">
                        <label htmlFor="input" className="p-col-12 p-md-2">Address:</label><br/>
                            <div className="p-col- p-md-10">
                            <InputText style={{"width":"90%"}} id = "Address" name="Address" required onChange={(e) => setAddr(e.target.value)} placeholder="Enter your address" />
                            </div>
                    </div><br/><br/>
                    <div className="p-field p-grid">
                        <label htmlFor="input" className="p-col-12 p-md-2">Food_items:</label><br/>
                            <div className="p-col- p-md-10">
                            <InputText style={{"width":"90%"}} id="Food_items" name="Food_items" required onChange={(e) => setFood(e.target.value)} placeholder="Enter your food-items" />
                            </div>
                    </div><br/><br/>
                    <div className="p-field p-grid">
                        <label htmlFor="input" className="p-col-12 p-md-2">Payment Method:</label><br/>
                            <div className="p-col- p-md-10">
                            <InputText style={{"width":"90%"}} id="Payment" name="Payment" required onChange={(e) => setPay(e.target.value)} placeholder="Enter your payment method" />
                            </div>
                    </div><br/><br/>
                    <Button style={{"width":"10%"}} label="SUBMIT" type="submit"/>
                </form>
            </div>
        </>
    )
}
export default Create