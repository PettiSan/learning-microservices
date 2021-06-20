import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

type EventsType = {
  type: "PostCreated" | "CommentCreated";
  data: PostsType | CommentsType;
};

type PostsType = {
  id: any;
  title: string;
  comments: CommentType[];
};

type CommentsType = {
  id: any;
  text: string;
  postID: any;
};

type CommentType = {
  id: any;
  text: string;
};

const app = express();

const posts: PostsType[] = [];

app.use(bodyParser.json());
app.use(cors());

app.get("/posts", (req, res) => {
  res.status(200).send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body as EventsType;

  if (type === "PostCreated") {
    const { id, title } = data as PostsType;

    posts.push({ id, title, comments: [] });
  }

  if (type === "CommentCreated") {
    const { id, text, postID } = data as CommentsType;

    posts[posts.findIndex((v) => v.id === postID)].comments.push({
      id,
      text,
    });
  }

  res.send({});
});

app.listen(4002, () => {
  console.log("Listening on 4002");
});
