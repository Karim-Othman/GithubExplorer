const express = require ('express');
const router = express.Router();
var ECodeHandler = require ('../util/eCodeHandler');
const GitHubHandler = require('../thirdParties/gitHubHandler');

//Request validation bad request.. No username was sent
router.get('/',(req, res) => {  
        const eCode= ECodeHandler.eCodeMapper('badRequest');
        res.status(eCode.status).send(eCode);
});



router.get('/:userName',async (req, res) => {

    if (req.headers.accept!='application/json'){
        const eCode = ECodeHandler.eCodeMapper('notAcceptableReq');
        res.status(eCode.status).send(eCode);
    }
    else{
        const authorization = req.headers.authorization;
        const finalResponse = await GitHubHandler.getRepos(req.params.userName,authorization);
        const resObj = ECodeHandler.eCodeHandler(finalResponse);
        res.status(resObj.status).send(resObj.res);}
    
});

router.get('/graphql/:userName',async(req, res) => {
    if (req.headers.accept!='application/json'){
        const eCode = ECodeHandler.eCodeMapper('notAcceptableReq');
        res.status(eCode.status).send(eCode);
    }
    else{
        const authorization = req.headers.authorization;
        const finalResponse= await GitHubHandler.githubGraphqlIntegration(req.params.userName,authorization);
        const resObj = ECodeHandler.eCodeHandler(finalResponse);
        res.status(resObj.status).send(resObj.res);
    }
});

module.exports = router;