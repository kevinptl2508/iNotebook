const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    obj = {
        id : "nsi12j9j21",
        number : 45
    }
    res.json(obj);
})
router.get('/about',(req,res)=>{
    obj = {
        id : "nsi12j3hd31",
        number : 11111
    }
    res.json(obj);
})

module.exports = router;