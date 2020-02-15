const axios = require("axios");
var APIsUtil= require('./APIs');
const GitHubParser = require('../parsers/gitHubResponseParser');


//console.log(APIsUtil.postBodyGetter('GetNonForkedReposAndRelativeBranches','Karim-othman'));

exports.getRepos = (userName) =>{

  const APIinfo = APIsUtil.URIgetter('gitHubRepos',userName);

  const userRepos =  axios.get(APIinfo.URI)
  .then((response)=>{
    const enrichedResponse=enrichResponseWithBranchData(GitHubParser.extractReposData(response.data),userName);
    })
  .catch (error => console.log(error));
  
  return userRepos;
};

async function enrichResponseWithBranchData (reposArr,userName){

    //Map over Repos array to get URIs in order to get relative branches
    const branchesURIs= reposArr.map(repo => {
      
      URI=APIsUtil.URIgetter('gitHubBranches',userName,repo.repoName).URI;
      return axios.get(URI);
    });
    
    const IndexedReposArr = reposArr.reduce((acc, repo) => (acc[repo.repoName] = repo, acc), {});

  
    axios.all(branchesURIs)
    .then(axios.spread((...responses) => {
      responses.forEach((res,IndexedReposArr) => GitHubParser.extractRepoBranchesAndEnrichData(res.data,IndexedReposArr));
    }))
    .catch (error => console.log(error));

}