import bodyParser from "body-parser";
import express from "express";
import {
  deleteAll,
  deleteOne,
  getOrigin,
  originImage,
  related,
  saveImage,
  searchByType,
  updateImage
} from "./graphQLService";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/save", saveImage);
app.get("/api/images", getOrigin);
app.post("/api/filterType", searchByType);
app.post("/api/related", related);
app.post("/api/delete", deleteAll);
app.post("/api/del", deleteOne);
app.post("/api/update", updateImage);
app.post("/api/origin", originImage);

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Listening on port ${port}`));
