const axios = require("axios");
var APIsUtil= require('./APIs');
const GitHubParser = require('../parsers/gitHubResponseParser');


//console.log(APIsUtil.postBodyGetter('GetNonForkedReposAndRelativeBranches','Karim-othman'));

exports.getRepos = (userName, Authorization) =>{

  const APIinfo = APIsUtil.URIgetter('gitHubRepos',userName);
  const Header = Authorization ? {headers: {Authorization}}:{headers:{}}; // if token sent to increase limit; forward it
  return axios.get(APIinfo.URI, Header)
  .then((response)=>{
    return enrichResponseWithBranchData(GitHubParser.extractReposData(response.data),userName, Authorization);
    })
  .catch (error =>{return error.response.status;});
  
  
};

async function enrichResponseWithBranchData (reposArr,userName, Authorization){

  const Header = Authorization ? {headers: {Authorization}}:{headers:{}}; // if token sent to increase limit; forward it

    //Map over Repos array to get URIs in order to get relative branches
    const branchesURIs= reposArr.map(repo => {
     
      URI=APIsUtil.URIgetter('gitHubBranches',userName,repo.repoName).URI;
      return axios.get(URI, Header);
    });
    
    let IndexedReposArr = reposArr.reduce((acc, repo) => (acc[repo.repoName] = repo, acc), {});
    let finalParsedArray=[];
    return axios.all(branchesURIs)
    .then(axios.spread((...responses) => {
      responses.forEach((res) => GitHubParser.extractRepoBranchesAndEnrichData(res.data,IndexedReposArr,userName,finalParsedArray));
      //console.log("IndexedReposArr is", JSON.stringify(finalParsedArray));
      return finalParsedArray;
    }))
    .catch (error => console.log(error.response.status,error.response.statusText));

}

exports.githubGraphqlIntegration =(userName)=>{

}