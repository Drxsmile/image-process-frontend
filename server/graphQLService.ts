import fetch from "cross-fetch";

export const myGraphql = (query: string, variables: {}, res: any) => {
  fetch("http://localhost:8080/graphql", {
    body: JSON.stringify({
      query,
      variables
    }),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  })
    .then(response => response.json())
    .then(result => {
      console.log("result:", result.data);

      res.send(result.data);
    })
    .catch(error => console.log("error", error));
};

const q =
  "query ($filterName: String!) { findImagesByFilterType(filterName: $filterName) {id name filterName s3Key time} }";

export const getOrigin = async (req: any, res: any) => {
  const vars = { filterName: "origin" };
  myGraphql(q, vars, res);
};

export const searchByType = async (req: any, res: any) => {
  console.log(req.body.filterName);
  const vars = { filterName: req.body.filterName.toString() };
  myGraphql(q, vars, res);
};

const origin =
  "query ($id: ID!) { findImageByFilteredImage(id: $id) {id name filterName s3Key time} }";
const filtered =
  "query ($id: ID!) { getImagesByOriginImage(id: $id) {id name filterName s3Key time} }";
export const related = async (req: any, res: any) => {
  console.dir(req.body);
  const vars = { id: req.body.id.toString() };
  const rel = req.body.filterName === "origin" ? filtered : origin;
  await myGraphql(rel, vars, res);
};

export const originImage = (req: any, res: any) => {
  console.dir(req.body);
  const vars = { id: req.body.id.toString(), name: req.body.name.toString() };
  const o =
    "query ($id: ID!, $name: String!) { getImageByPrimaryKey(id: $id, name: $name) {id name filterName s3Key time} }";
  myGraphql(o, vars, res);
};

export const deleteAll = (req: any, res: any) => {
  const del = "mutation ($id: ID!) {deleteImages(id: $id)}";
  const vars = { id: req.body.id.toString() };
  myGraphql(del, vars, res);
};
export const deleteOne = (req: any, res: any) => {
  const del =
    "mutation ($id: ID!, $name: String!) {deleteImage(id: $id, name: $name)}";
  const vars = { id: req.body.id.toString(), name: req.body.name.toString() };
  myGraphql(del, vars, res);
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
  const update =
    "mutation ($input: UpdateImageInput!) { updateImage(input: $input) {id name filterName s3Key time} }";
  myGraphql(update, vars, res);
};
