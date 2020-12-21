import bodyParser from "body-parser";
import express from "express";
import {
  deleteAll,
  deleteOne,
  getOrigin,
  originImage,
  related,
  searchByType,
  updateImage
} from "./graphQLService";

// import formidableMiddleware from "express-formidable";
import multer from "multer";
import { saveImage } from "./upload";

const upload = multer({ dest: "uploads/" });

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(formidableMiddleware());

app.post("/api/save", upload.single("image"), saveImage);
// app.post("/api/save", saveImage);
app.get("/api/images", getOrigin);
app.post("/api/filterType", searchByType);
app.post("/api/related", related);
app.post("/api/delete", deleteAll);
app.post("/api/del", deleteOne);
app.post("/api/update", updateImage);
app.post("/api/origin", originImage);

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Listening on port ${port}`));
