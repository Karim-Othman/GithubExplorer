# GithubExplorer
This API should list all non-forked gitHub repos of a given userName. Implmentation is based on gitHub API V3 and V4 as a backing API. It contains two GET endpoints on of them is based on REST integration with github API V3 and the other endpoint is based on GraphQL integration with github API V4. Both endpoints have the same response signature but the GrapghQL on is way faster than the other (~0.5 elapsed time).

drawback of V3 implementation/integaration that application make many hits on gitHub server which increase API elapsed time

drawback of V4 (GraphQL) implementation/integaration that we are limited with pagination and consumer should pass token as a mandatory field in header

# Swagger 
[Swagger File](https://github.com/Karim-Othman/GithubExplorer/blob/master/GithubExplorerSwagger.yaml)
[Swagger Hub ](https://app.swaggerhub.com/apis/KarimOthman/github-explorer_api/1.0.0)

# Mocks/examples
[V3 mock](https://fba7d481-7f42-40e1-b3d3-8ff8264a2620.mock.pstmn.io/githubRepo/Karim-Othman)
[GrapghQL V4 mock](https://fba7d481-7f42-40e1-b3d3-8ff8264a2620.mock.pstmn.io/githubRepo/graphql/christinatruong)
