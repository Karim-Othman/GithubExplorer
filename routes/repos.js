const express = require ('express');
const router = express.Router();
var ECodeHandler = require ('../util/eCodeHandler');

//Request validation bad request.. No username was sent
router.get('/',(req, res) => {  
        const eCode= ECodeHandler('badRequest');
        res.status(eCode.status).send(eCode);
});


router.get('/:userName',(req, res) => {
    const eCode= ECodeHandler('Success');
    res.status(eCode.status).send(eCode);
    
});

module.exports = router;