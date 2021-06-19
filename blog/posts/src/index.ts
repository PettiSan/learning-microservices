import express from "express";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(cors());

type PostType = {
  id: any;
  title: string;
};

let posts: PostType[] = [];

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  const id: any = randomBytes(4).toString("hex");

  const { title } = req.body;

  posts.push({ id: id, title: title });

  res.status(201).send(posts.find((v) => v.id === id));
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
