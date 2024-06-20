import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database:"customerdb"
})

app.get('/', (req, res) => {
    const sql ="SELECT * FROM customer";
    db.query(sql, (err, data) => {
        if(err) {
            return res.json({Error:"Error"})
        }
        return res.json(data)
    })
})

app.post('/create', (req, res) => {
    const sql ="INSERT INTO customer (Order_id, Name, Address, Food_items, Payment) VALUES (?)";
    const values = [
        req.body.Order_id,
        req.body.Name,
        req.body.Address,
        req.body.Food_items,
        req.body.Payment,
    ]
    db.query(sql,[values], (err, data) => {
        if(err) {
            return res.json({Error:"Error"})
        }
        return res.json(data)
    })
})

app.put('/edit/:Order_id', (req, res) => {
    const sql = "UPDATE customer SET Name = ?, Address = ?, Food_items = ?, Payment = ? WHERE Order_id = ?";
    const values = [
        req.body.Name,
        req.body.Address,
        req.body.Food_items,
        req.body.Payment
    ];
    const Order_id = req.params.Order_id;

    db.query(sql, [...values, Order_id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error"});
        }
        return res.json(data);
    });
});

app.delete('/delete/:Order_id', (req, res) => {
    const sql ="DELETE FROM customer WHERE Order_id = ?";
    const Order_id = req.params.Order_id;
    db.query(sql,[Order_id], (err, data) => {
        if(err) {
            return res.json({Error:"Error"})
        }
        return res.json(data)
    })
})

app.get('/read/:Order_id', (req, res) => {
    const Order_id = req.params.Order_id;
    const sql="SELECT * FROM customer WHERE Order_id = ?"
    db.query(sql,[Order_id], (err, data) => {
        if(err) {
            return res.json({Error:"Error"})
        }
        return res.json(data)
    })
})

app.listen(3030,()=> {
    console.log("Server is Running...")
})

