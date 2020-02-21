exports.extractReposData = (gitHubPayload) => {
const reposData = gitHubPayload.reduce((nonFokredRepos, repo) => {
 
    if (!repo.fork){ //remove forked repos
        let tempContainer = {repoName: repo.name, ownerLogin: repo.owner.login};
        nonFokredRepos.push(tempContainer);
        }
    return nonFokredRepos;
},[]);
return reposData;
};

exports.extractRepoBranchesAndEnrichData = (gitHubPayload, IndexedReposArr, userName, finalParsedArray) => {
    // this workaround done as we may fail in one request out of all.. so repo name will be extracted from response

    if (gitHubPayload.length >0){

        const CurrentRepoName = getRepoNameFromBranchResponse (gitHubPayload[0].commit.url,userName);         
        var repoBranchesArr=[];
        gitHubPayload.map(branch=>{  
                    const branchData ={
                        branchName:branch.name,
                        lastCommitSha:branch.commit.sha
                    };
                    repoBranchesArr.push(branchData);
            });
        var tempObject = {repoName:CurrentRepoName,
                ownerLogin:IndexedReposArr[CurrentRepoName].ownerLogin,
                branches:repoBranchesArr};
        finalParsedArray.push(tempObject);
    }

};


function getRepoNameFromBranchResponse (branchURL,userName) {

    var pattern = `(?<=${userName}\/)(.+?)(?=\/commits)`;
    var rePattern = new RegExp(pattern,"i"); // i as userName is case-insensitive
    var arrMatches = branchURL.match(rePattern);

    return arrMatches[0];

}