import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { gql } from "apollo-boost";
import fetch from "cross-fetch";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:8080/graphql", fetch }),
  cache: new InMemoryCache()
});

// const gqlQuery = (query: string, variables = {}) => {
//   const p = new Promise(resolve => {
//     client
//       .query({
//         query,
//         variables
//       })
//       .then(res => {
//         console.log("graphql response here", res);
//         resolve(res.data);
//         console.log("data returned:\n", res.data);
//       });
//   });
//   return p;
// };

// const gqlMutate = (mutation, variables = {}) => {
//   const p = new Promise(resolve => {
//     client
//       .mutate({
//         mutation,
//         variables
//       })
//       .then(res => {
//         console.log("graphql response here");
//         resolve(res.data);
//         console.log("data returned:\n", res.data);
//       });
//   });
//   return p;
// };

// export const saveImage = (req: any, res: any) => {};

// export const getOriginImages = async (req, res) => {
client
  .query({
    query: gql`
      query GetImages {
        findImagesByFilterType(filterName: "origin") {
          s3Key
        }
      }
    `
    // variables: { filterName: "origin" }
  })
  .then(result => console.log(result.data));
// };

// export const saveImage = (req: any, res: any) => {};

export const getOrigin = async (req: any, res: any) => {
  // const variables = { filterName: "origin" };
  const p = new Promise(resolve => {
    client
      .query({
        query: gql`
          query findImagesByFilterType {
            findImagesByFilterType(filterName: "origin") {
              id
              name
              filterName
              s3Key
              time
            }
          }
        `
      })
      .then(res => {
        resolve(res.data);
        console.log("xxx data returned:\n", res.data);
      });
  });
  res.send(res.data);
  // return p;
};
