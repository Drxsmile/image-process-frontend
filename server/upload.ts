import FormData from "formdata-node";
import fs from "fs";
import fetch from "node-fetch";

export const saveImage = async (req: any, res: any) => {
  console.dir(req.file);
  const path = req.file.path;
  const formData = new FormData();
  formData.append("image", fs.createReadStream(path));
  formData.append("name", req.body.name.toString());
  formData.append("operations", "{\"query\": \"mutation($name: String!, $image:Upload!){saveOriginImage(name: $name, image:$image){s3Key time id name filterName}}\", \"variables\":{}}");
  await fetch(
    "http://ec2-13-251-89-22.ap-southeast-1.compute.amazonaws.com:8080/graphql",
    {
      method: "POST",
      body: formData.stream,
      headers: formData.headers
    }
  )
    .then(response => response.json())
    .then(result => {
      console.log("result:", result.data);
      fs.unlink(path, err => {
        if (err) {console.log("error", err);}
      });
      res.send(result.data);
    })
    .catch(error => console.log("error", error));
};
