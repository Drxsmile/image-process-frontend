import fetch from "cross-fetch";
import FormData from "form-data";

export const saveImage = async (req: any, res: any) => {
  const formData = new FormData();
  formData.append("image", req.file);
  formData.append("name", req.body.name.toString());
  formData.append("operations", "{\"query\": \"mutation($name: String!, $image:Upload!){saveOriginImage(name: $name, image:$image){s3Key time id name filterName}}\", \"variables\":{}}");
  // @ts-ignore
  await fetch("http://localhost:8080/graphql", {
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
    .then(response => response.json())
    .then(result => {
      console.log("result:", result.data);
      res.send(result.data);
    })
    .catch(error => console.log("error", error));
};
