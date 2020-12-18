import bodyParser from "body-parser";
import express from "express";
import { getOrigin, related, searchByType } from "./graphQLService";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.post("/api/save", saveImage);
app.get("/api/images", getOrigin);
app.post("/api/filterType", searchByType);
app.post("/api/related", related);

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Listening on port ${port}`));
