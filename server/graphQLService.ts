import { ApolloClient, InMemoryCache } from "@apollo/client";
import { gql } from "apollo-boost";
// import { ApolloLink, from } from "apollo-link";
import { createUploadLink } from "apollo-upload-client";
import fetch from "cross-fetch";

const client = new ApolloClient({
  // "http://ec2-13-251-89-22.ap-southeast-1.compute.amazonaws.com:8080/graphql"
  // link: new HttpLink({ uri: "http://localhost:8080/graphql", fetch }),
  link: createUploadLink({ uri: "http://localhost:8080/graphql", fetch }),
  cache: new InMemoryCache()
});

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
      console.log("result:", result.data);
      res.send(result.data);
    });
};
export const originImage = (req: any, res: any) => {
  console.dir(req.body);
  const vars = { id: req.body.id.toString(), name: req.body.name.toString() };
  const o = gql`
    query getImageByPrimaryKey($id: ID!, $name: String!) {
      getImageByPrimaryKey(id: $id, name: $name) {
        id
        name
        filterName
        s3Key
        time
      }
    }
  `;
  client
    .query({
      query: o,
      variables: vars
    })
    .then(result => {
      console.log("result:", result.data);
      res.send(result.data);
    });
};
export const deleteAll = (req: any, res: any) => {
  const del = gql`
    mutation deleteImages($id: ID!) {
      deleteImages(id: $id)
    }
  `;
  const vars = { id: req.body.id.toString() };
  client
    .mutate({
      mutation: del,
      variables: vars
    })
    .then(result => {
      console.log("result:", result.data);
      res.send(result.data);
    });
};
export const deleteOne = (req: any, res: any) => {
  const del = gql`
    mutation deleteImage($id: ID!, $name: String!) {
      deleteImage(id: $id, name: $name)
    }
  `;
  const vars = { id: req.body.id.toString(), name: req.body.name.toString() };
  client
    .mutate({
      mutation: del,
      variables: vars
    })
    .then(result => {
      console.log("result:", result.data);
      res.send(result.data);
    });
};
export const saveImage = async (req: any, res: any) => {
  // console.dir(req.files.image);
  const vars = { name: req.fields.name.toString(), image: req.files.image };
  const save = gql`
    mutation saveOriginImage($name: String!, $image: Upload!) {
      saveOriginImage(name: $name, image: $image) {
        id
        name
        filterName
        s3Key
        time
      }
    }
  `;
  await client
    .mutate({
      mutation: save,
      variables: vars
    })
    .then(result => {
      console.log("result:", result.data);
      res.send(result.data);
    })
    .catch(err => console.log(err));
};
export const updateImage = (req: any, res: any) => {
  const vars = {
    input: {
      id: req.body.id.toString(),
      name: req.body.name.toString(),
      filterName: req.body.filterName.toString(),
      newName: req.body.newName.toString()
    }
  };
  const update = gql`
    mutation updateImage($input: UpdateImageInput!) {
      updateImage(input: $input) {
        id
        name
        filterName
        s3Key
        time
      }
    }
  `;
  client
    .mutate({
      mutation: update,
      variables: vars
    })
    .then(result => {
      console.log("result:", result.data);
      res.send(result.data);
    });
};
