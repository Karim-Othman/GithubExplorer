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

exports.extractRepoBranchesAndEnrichData = (gitHubPayload, IndexedReposArr) => {
    // this workaround done as we may fail in one request out of all.. so repo name will be extracted from response

    const parsedBranchesArr = gitHubPayload.reduce((IndexedReposArr,branchObj)=>{

    });

};