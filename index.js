const express = require("express");
const ProductRouter = require("./routers/product.router");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const OrderRouter = require("./routers/order.router");
const app = express()
app.use(bodyParser())



app.use("/product", ProductRouter)
app.use("/order", OrderRouter)



const PORT = 5000 || process.env.PORT;

const uri = 'mongodb://127.0.0.1:27017/shop'

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', () => {

    console.log('MongoDB-ga muvaffaqiyatli ulanildi');
});

db.on('error', (err) => {

    console.error('MongoDB-ga ulanishda xatolik yuz berdi:', err.message);
});

app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`);
});
