import express from "express";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(bodyParser.json());
app.use(cors());

enum StatusEnum {
  Aproved = "aproved",
  Rejected = "rejected",
  Pending = "pending",
}

type CommentType = {
  id: any;
  text: string;
  status: StatusEnum;
};

type CommentsType = {
  id: any;
  comments: CommentType[];
};

type CommentsModerateType = {
  type: "CommentModerated";
  data: CommentModerateType;
};

type CommentModerateType = {
  id: any;
  text: string;
  postID: any;
  status: StatusEnum;
};

let commentsByPostId: CommentsType[] = [];

app.get("/posts/:id/comments", (req, res) => {
  const id = req.params.id;

  res.send(commentsByPostId.find((v) => v.id === id)?.comments || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId: any = randomBytes(4).toString("hex");

  const { text } = req.body;

  let newComment: CommentType = {
    id: commentId,
    text,
    status: StatusEnum.Pending,
  };

  commentsByPostId[
    commentsByPostId.findIndex((v) => v.id === req.params.id)
  ]?.comments.push(newComment) ||
    commentsByPostId.push({ id: req.params.id, comments: [newComment] });

  // !EventBus Service
  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      ...newComment,
      postID: req.params.id,
    },
  });

  res.status(201).send(commentsByPostId);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body as CommentsModerateType;

  console.log("Received Event: ", type);

  if (type === "CommentModerated") {
    const { id, text, status, postID } = data;

    commentsByPostId
      .find((p) => p.id === postID)
      ?.comments.find((c) => c.id === id)?.status === status;

    await axios.post("http://localhost:4005/events", {
      type: "CommentUpdated",
      data,
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
