import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css"; // theme
import "primereact/resources/primereact.min.css"; // core css
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

function Edit() {
    const { Order_id } = useParams();
    const [values, setValues] = useState({
        Name: "",
        Address: "",
        Food_items: "",
        Payment: "",
    });

    const history = useNavigate();

    const handleUpdate = async (e) => {
        e.preventDefault();
            const res = await axios.put(`http://localhost:3030/edit/${Order_id}`, values);
            history('/');
    
    };

    useEffect(() => {
        const fetchData = async () => {
                const res = await axios.get(`http://localhost:3030/read/${Order_id}`);
                if (res.data && res.data.length > 0) {
                    const data = res.data[0];
                    setValues({
                        Name: data.Name,
                        Address: data.Address,
                        Food_items: data.Food_items,
                        Payment: data.Payment
                    });
                }
        };
        fetchData();
    }, [Order_id]);

    return (
        <div className="card">
            <h1 style={{ "textAlign": "left" }}>Update the changes:</h1>
            <form onSubmit={handleUpdate}>
                <div className="p-field p-grid">
                    <label htmlFor="Name" className="p-col-12 p-md-2">Name:</label><br/>
                    <div className="p-col-12 p-md-10">
                        <InputText id="Name" style={{ width: "90%" }} value={values.Name} name="Name" required onChange={(e) => setValues({ ...values, Name: e.target.value })} placeholder="Enter your name" />
                    </div>
                </div><br/><br/>
                <div className="p-field p-grid">
                    <label htmlFor="Address" className="p-col-12 p-md-2">Address:</label><br/>
                    <div className="p-col-12 p-md-10">
                        <InputText id="Address" style={{ width: "90%" }} value={values.Address} name="Address" required onChange={(e) => setValues({ ...values, Address: e.target.value })} placeholder="Enter your address" />
                    </div>
                </div><br/><br/>
                <div className="p-field p-grid">
                    <label htmlFor="Food_items" className="p-col-12 p-md-2">Food items:</label><br/>
                    <div className="p-col-12 p-md-10">
                        <InputText id="Food_items" style={{ width: "90%" }} value={values.Food_items} name="Food_items" required onChange={(e) => setValues({ ...values, Food_items: e.target.value })} placeholder="Enter your food items" />
                    </div>
                </div><br/><br/>
                <div className="p-field p-grid">
                    <label htmlFor="Payment" className="p-col-12 p-md-2">Payment Method:</label><br/>
                    <div className="p-col-12 p-md-10">
                        <InputText id="Payment" style={{ width: "90%" }} value={values.Payment} name="Payment" required onChange={(e) => setValues({ ...values, Payment: e.target.value })} placeholder="Enter your payment method" />
                    </div>
                </div><br/><br/>
                <Button style={{ width: "10%" }} label="SAVE" type="submit" />
            </form>
        </div>
    );
}

export default Edit;

