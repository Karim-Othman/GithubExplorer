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