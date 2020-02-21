const express = require ('express');
const router = express.Router();
var ECodeHandler = require ('../util/eCodeHandler');
const GitHubHandler = require('../thirdParties/gitHubHandler');

//Request validation bad request.. No username was sent
router.get('/',(req, res) => {  
        const eCode= ECodeHandler('badRequest');
        res.status(eCode.status).send(eCode);
});


router.get('/:userName',async (req, res) => {

    const authorization = req.headers.authorization;
    const finalResponse = await GitHubHandler.getRepos(req.params.userName,authorization);
    const eCode= ECodeHandler('Success');
    res.status(eCode.status).send(finalResponse);
    
});

module.exports = router;