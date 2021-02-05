const cors = require('cors');
const express = require('express');
const stripe = require('stripe')('sk_test_51Ho8xdBakjPsKX7THm2HE6LaAi2snkEpHORbLT3Omllr9RRmZHH6d9P5Yyl5A44qW857gfjjESMxidXw61Vg6kWU00KTfaukui');
const { v4: uuidv4 } = require('uuid');
const app = express();


//middlewares
app.use(express.json());
app.use(cors());

//routes
app.get('/', (req,res)=>{
    res.send('This is me');
});

//we are going to create a post route here, so customer will hit this from frontend
app.post('/payment', (req,res)=>{
    //we need to pass a token from frontend because it will have all information we need
    const {product, token} = req.body;
    console.log('product', product);
    console.log('price', product.price);
    const idempontencyKey = uuidv4();
    //now we will hit the stripe routes
    return stripe.customers.create({
        email : token.email,
        source : token.id
        //if it all goes good, it will hit the promise then
    }).then(customer => {
        //now here we are creating charge so user will be charged
        //we provide two arguments here
        //in the first object, you have to extract information there, some of them are necessary
        stripe.charges.create(
            {
              amount: product.price * 100,
              currency: "usd",
              customer: customer.id,
              receipt_email: token.email,
              description: `purchase of ${product.name}`,
              shipping: {
                name: token.card.name,
                address: {
                  country: token.card.address_country
                }
              }
            },
            { idempontencyKey }
          );
        })
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));
    });


//listen
app.listen(3000, (req,res)=>{
    console.log('Server is listening');
});