import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { gql } from "apollo-boost";
import fetch from "cross-fetch";

const client = new ApolloClient({
  // "http://ec2-13-251-89-22.ap-southeast-1.compute.amazonaws.com:8080/graphql"
  link: new HttpLink({ uri: "http://localhost:8080/graphql", fetch }),
  cache: new InMemoryCache()
});

// export const saveImage = (req: any, res: any) => {};
const q = gql`
  query findImagesByFilterType($filterName: String!) {
    findImagesByFilterType(filterName: $filterName) {
      id
      name
      filterName
      s3Key
      time
    }
  }
`;

export const getOrigin = async (req: any, res: any) => {
  const vars = { filterName: "origin" };
  client
    .query({
      query: q,
      variables: vars
    })
    .then(result => {
      res.send(result.data);
    });
};

export const searchByType = async (req: any, res: any) => {
  console.log(req.body.filterName);
  const vars = { filterName: req.body.filterName.toString() };
  client
    .query({
      query: q,
      variables: vars
    })
    .then(result => {
      res.send(result.data);
    });
};

const origin = gql`
  query findImageByFilteredImage($id: ID!) {
    findImageByFilteredImage(id: $id) {
      id
      name
      filterName
      s3Key
      time
    }
  }
`;
const filtered = gql`
  query getImagesByOriginImage($id: ID!) {
    getImagesByOriginImage(id: $id) {
      id
      name
      filterName
      s3Key
      time
    }
  }
`;
export const related = async (req: any, res: any) => {
  console.dir(req.body);
  const vars = { id: req.body.id.toString() };
  const rel = req.body.filterName === "origin" ? filtered : origin;
  client
    .query({
      query: rel,
      variables: vars
    })
    .then(result => {
      res.send(result.data);
    });
};
