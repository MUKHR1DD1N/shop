

const Order = require("../modules/order.module");
const Product = require("../modules/product.module")


async function OrdersCreate(req, res) {
    let { items } = req.body
    try {
        // Orderdagi itemlarni oling

        // items bo'yicha Mahsulot kodlarini oling
        const codes = items.map(item => item.code);
        console.log(codes);
        // Mahsulotlarni toping

    
        const mahsulotlar = await Product.find({
            code: { $in: codes }
        });
        
        let codesObject = {}
        console.log(mahsulotlar);

        mahsulotlar.map(product => {
            codesObject[product.code] = { price: product.price }
        })

        let cost = 0

        console.log(mahsulotlar);
        // Mahsulotlarni yangilash
        for (const item of items) {
            // Mahsulotni qidirish
            const mahsulot = mahsulotlar.find(m => {
                console.log(m, " =>Code M");
                console.log(item);
                return m.code === item.code

            });
            console.log("mahsulot=>", mahsulot);
            if (mahsulot) {
                // Mahsulotning massasini yangilash
                mahsulot.massa = mahsulot.massa - item.massa;

                // Yangilangan mahsulotni saqlash
                await mahsulot.save();


                cost += item.massa * codesObject[item.code].price
            } 
        }


        let createdOrder = await Order.create({ items, cost })

        res.status(200).send({ success: true, order: createdOrder })
    } catch (err) {
        console.error('Xatolik yuz berdi:', err);
    }
}

// order.controller.js

// async function OrdersCreate(req, res) {
//     let { items } = req.body;
//     try {
//         // Подготовка к созданию заказа
//         const codes = items.map(item => item.code);
//         const products = await Product.find({ code: { $in: codes } });

//         const codesObject = {};
//         products.forEach(product => {
//             codesObject[product.code] = { price: product.price, massa: product.massa };
//         });

//         let cost = 0;
//         let updatedProducts = [];

//         for (const item of items) {
//             const product = products.find(p => p.code === item.code);
//             if (product) {
//                 product.massa -= item.massa;
//                 updatedProducts.push(product.save());
//                 cost += item.massa * codesObject[item.code].price;
//             }
//         }

//         // await Promise.all(updatedProducts);

//         const createdOrder = await Order.create({ items, cost });
//         res.status(200).json({ success: true, order: createdOrder });
//     } catch (err) {
//         console.log(err);
//         console.error('Error:', err);
//         res.status(500).json({ success: false, msg: 'Internal server error' });
//     }
// }

module.exports = { OrdersCreate }


// async function getByDate(req, res) {
//     let { start, end } = req.params

//     try {

//         let orders = await Order.find({

//             time: {
//                 $gt: start,  // code qiymati 12 dan katta bo'lishi kerak
//                 $lt: end   // code qiymati 18 dan kichik bo'lishi kerak

//             }

//         })

//         if (!orders.length) {

//             res.status(400).send({ success: false, msg: "Ushbu vaqtda savdo bo'lmagan" })
//             return
//         }

//         res.status(200).send({ success: true, orders })
//         return

//     } catch (err) {

//         console.error('Xatolik yuz berdi:', err);

//     }

// }


// module.exports = { getByDate }
