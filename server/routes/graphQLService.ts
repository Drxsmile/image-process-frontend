import ApolloBoost, { ApolloClient, InMemoryCache } from "apollo-boost"; // 引入核心
import { createHttpLink } from "apollo-link-http"; // 引入http
import gql from "graphql-tag";
import fetch from "node-fetch";

const client = new ApolloClient({
  link: createHttpLink({
    uri: "http://localhost:8080/graphql", // 这个url可以抽取到配置文件里
    fetch: fetch
  }),
  cache: new InMemoryCache()
});

const gqlQuery = (query, variables = {}) => {
  const p = new Promise(resolve => {
    client
      .query({
        query,
        variables
      })
      .then(res => {
        console.log("graphql response here");
        resolve(res.data);
        console.log("data returned:\n", res.data);
      });
  });
  return p;
};

const gqlMutate = (mutation, variables = {}) => {
  const p = new Promise(resolve => {
    client
      .mutate({
        mutation,
        variables
      })
      .then(res => {
        console.log("graphql response here");
        resolve(res.data);
        console.log("data returned:\n", res.data);
      });
  });
  return p;
};

const getOrigin = gql`
  query findImagesByFilterType($filterName: String!) {
    findImagesByFilterType(filterName: $filterName) {
      s3Key
      time
    }
  }
`;

// export const saveImage = (req: any, res: any) => {};

export const getOriginImages = async (req, res) => {
  const variables = { filterName: "origin" };
  const result = await gqlQuery(getOrigin, variables);
  console.info(result);
  res.send(result);
};
