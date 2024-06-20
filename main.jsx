import React, { useEffect, useState } from "react";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";   
import "primeflex/primeflex.css";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

function Main() {

    const [customer,setCustomer] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3030')
        .then(res => setCustomer(res.data))
        .catch(err => console.log(err))
    },[])


    const handleDelete = (Order_id) => {
        axios.delete('http://localhost:3030/delete/'+Order_id)
            .then(res => window.location.reload())
            .catch(err => console.log(err))
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Link to={`/read/${rowData.Order_id}`}>
                    <Button label="READ" />
                </Link>
                &nbsp;
                <Link to={`/edit/${rowData.Order_id}`}>
                    <Button label="EDIT" className="p-button-warning p-mr-2" />
                </Link>
                &nbsp;
                <Button
                    label="DELETE"
                    onClick={() => handleDelete(rowData.Order_id)}
                    className="p-button-danger"
                />
            </>
        );
    };

    return (
        <div>
            <h1 style={{"textAlign":"center"}}>Customer Details</h1>
            <br />
            {/* <div className="p-card ml-7 mr-7"> */}
                <DataTable value={customer} className="p-datatable-gridlines  ml-7 mr-7">
                    <Column field="Order_id" header="Order ID" ></Column>
                    <Column field="Name" header="Name"></Column>
                    <Column field="Address" header="Address"></Column>
                    <Column field="Food_items" header="Food Items"></Column>
                    <Column field="Payment" header="Payment" ></Column>
                    <Column header="Actions" body={actionBodyTemplate}></Column>
                </DataTable>
                <br />
                    <Link to="/create">
                        <Button label="CREATE" className="p-button-success ml-7" style={{ width: "91%" }} />
                    </Link>
            </div>
        // </div>
    );
}

export default Main;
