import express from "express";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(bodyParser.json());
app.use(cors());

type CommentType = {
  id: any;
  text: string;
};

type CommentsType = {
  id: any;
  comments: CommentType[];
};

let commentsById: CommentsType[] = [];

app.get("/posts/:id/comments", (req, res) => {
  const id = req.params.id;

  res.send(commentsById.find((v) => v.id === id)?.comments || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId: any = randomBytes(4).toString("hex");

  const { text } = req.body;

  let newComment: CommentType = { id: commentId, text };

  commentsById[
    commentsById.findIndex((v) => v.id === req.params.id)
  ]?.comments.push(newComment) ||
    commentsById.push({ id: req.params.id, comments: [newComment] });

  // !EventBus Service
  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      ...newComment,
      postID: req.params.id,
    },
  });

  res.status(201).send(commentsById);
});

app.post("/events", (req, res) => {
  const { type } = req.body;

  console.log("Received Event: ", type);

  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
