exports.URIgetter= function (usecase, userName, repoName){
  var URIs ={
    gitHubRepos:{method:'get',URI:`https://api.github.com/users/${userName}/repos`},
    gitHubBranches:{method:'get',URI:`https://api.github.com/repos/${userName}/${repoName}/branches`},
    gitHubGraphQL:{method:'post',URI:`https://api.github.com/graphql`}
};

    return URIs[usecase];
};

exports.postBodyGetter = function (usecase, userName){

  var graphQLqueries={
    GetNonForkedReposAndRelativeBranches:`query GetNonForkedReposAndRelativeBranches {
    __typename
    user(login: "${userName}") {
      repositories(isFork: false, first: 100) {
        nodes {
          name
          owner {
            login
          }
          refs(refPrefix: "refs/heads/", first: 100) {
            nodes {
              name
              target {
                oid
              }
            }
          }
        }
      }
    }
  }
  `
};

return graphQLqueries[usecase];

};

