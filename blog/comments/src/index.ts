import express from "express";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";
import cors from "cors";

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

app.post("/posts/:id/comments", (req, res) => {
  const commentId: any = randomBytes(4).toString("hex");

  const { text } = req.body;

  let newComment: CommentType = { id: commentId, text };

  commentsById[
    commentsById.findIndex((v) => v.id === req.params.id)
  ]?.comments.push(newComment) ||
    commentsById.push({ id: req.params.id, comments: [newComment] });

  res.status(201).send(commentsById);
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
