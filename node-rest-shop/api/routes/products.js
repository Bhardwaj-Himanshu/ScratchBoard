const express = require('express');

const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"You are successfully sending GET requests to /products"
    });
})

router.post('/',(req,res,next)=>{
    const product={
        name:req.body.name,
        price:req.body.price
    }
    res.status(200).json({
        message:"You are successfully sending POST requests to /products",
        createdProdcut:product
    });
})

router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    if(id === 'special'){
    res.status(200).json({
        message:"You discovered special ID.",
        id: id
    })
    }else{
    res.status(200).json({
        message:"This is some product ID.",
        id: id
    })
    }
})

module.exports=router;