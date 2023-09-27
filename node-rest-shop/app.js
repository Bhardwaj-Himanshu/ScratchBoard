const  express = require('express');
// spins up express application--> used as a function express()
const app=express();
const bodyParser=require('body-parser');

// logs up whenever any action is called or anything happens
const morgan=require('morgan');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//CORS--Cross-Origin-Resouce-Sharing Error prevention--> cause this is disabled as default by browser.
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');//header name+things I want to give access to(*--> everything has access)
    //res.header('Access Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');
    res.header('Allow-Control-Allow-Headers','*');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,GET,PATCH,DELETE')
        return res.status(200).json({});
    }
    next();
})

// everything passes from below
app.use(morgan('dev'));
// A body parser that either parses the encoded urls or JSON data
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/products',productRoutes);
app.use('/orders',orderRoutes);


app.use((req,res,next)=>{
    const error = new Error('Not found.');
    error.status=404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status=(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
})

module.exports=app;