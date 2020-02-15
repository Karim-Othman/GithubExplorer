const axios = require("axios");
var APIsUtil= require('./APIs');
const GitHubParser = require('../parsers/gitHubResponseParser');


//console.log(APIsUtil.postBodyGetter('GetNonForkedReposAndRelativeBranches','Karim-othman'));

exports.getRepos = (userName) =>{

  const APIinfo = APIsUtil.URIgetter('gitHubRepos',userName);

  const userRepos =  axios.get(APIinfo.URI)
  .then((response)=>{
    return GitHubParser.extractReposData(response.data);
    })
  .catch (error => console.log(error));
  
  return userRepos;
};
