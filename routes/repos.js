const express = require ('express');
const router = express.Router();
var ECodeHandler = require ('../util/eCodeHandler');
const GitHubHandler = require('../thirdParties/gitHubHandler');

//Request validation bad request.. No username was sent
router.get('/',(req, res) => {  
        const eCode= ECodeHandler.eCodeHandler('badRequest');
        res.status(eCode.status).send(eCode);
});

router.post('/graphql/:userName',async(req, res) => {  
    const eCode= ECodeHandler.eCodeHandler('badRequest');
    res.status(eCode.status).send(eCode);
});

router.get('/:userName',async (req, res) => {

    if (req.headers.accept!='application/json'){
        const eCode = ECodeHandler.eCodeHandler('notAcceptableReq');
        res.status(eCode.status).send(eCode);
    }
    else{
        const authorization = req.headers.authorization;
        const finalResponse = await GitHubHandler.getRepos(req.params.userName,authorization);
        if (finalResponse=="404"){
            const eCode = ECodeHandler.eCodeHandler(finalResponse);
            res.status(eCode.status).send(eCode);
        }
        else if (finalResponse.length>0){
        const eCode= ECodeHandler.eCodeHandler('Success');
        res.status(eCode.status).send(finalResponse);}

        else{
            const eCode= ECodeHandler.eCodeHandler('Unknown');
            res.status(eCode.status).send(eCode);
        }}
    
});

module.exports = router;