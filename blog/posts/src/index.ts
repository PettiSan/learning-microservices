import express from "express";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

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

app.post("/posts", async (req, res) => {
  const id: any = randomBytes(4).toString("hex");

  const { title } = req.body;

  posts.push({ id, title });

  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts.find((v) => v.id === id));
});

app.post("/events", (req, res) => {
  const { type } = req.body;

  console.log("Received Event: ", type);

  res.send({});
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
