const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"GET requests for /ORDERS routes."
    })
})

router.patch('/',(req,res,next)=>{
    const order={
        deliverydate:req.body.delivery,
        avaliabletime:req.body.avaliblity
    }
    res.status(200).json({
        message:"PATCH requests for /ORDERS routes.",
        thingschanged: {
            deliverydate:order.deliverydate,
            avaliabletime:order.avaliabletime
        }    
    })
})

module.exports = router;