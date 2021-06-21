import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

type EventsType = {
  type: "PostCreated" | "CommentCreated" | "CommentUpdated";
  data: PostsType | CommentsType;
};

type PostsType = {
  id: any;
  title: string;
  comments: CommentType[];
};

enum StatusEnum {
  Approved = "approved",
  Rejected = "rejected",
  Pending = "pending",
}

type CommentsType = {
  id: any;
  text: string;
  postID: any;
  status: StatusEnum;
};

type CommentType = {
  id: any;
  text: string;
  status: StatusEnum;
};

const app = express();

const posts: PostsType[] = [];

app.use(bodyParser.json());
app.use(cors());

app.get("/posts", (req, res) => {
  res.status(200).send(posts);
});

const handleEvent = (props: EventsType) => {
  const { type, data } = props;

  if (type === "PostCreated") {
    const { id, title } = data as PostsType;

    posts.push({ id, title, comments: [] });
  }

  if (type === "CommentCreated") {
    const { id, text, status, postID } = data as CommentsType;

    posts[posts.findIndex((v) => v.id === postID)].comments.push({
      id,
      text,
      status,
    });
  }

  if (type === "CommentUpdated") {
    const { id, text, status, postID } = data as CommentsType;

    let comments = posts[posts.findIndex((p) => p.id === postID)].comments;
    comments[comments.findIndex((c) => c.id === id)].status = status;
    comments[comments.findIndex((c) => c.id === id)].text = text;
  }
};

app.post("/events", (req, res) => {
  handleEvent(req.body);

  res.send({});
});

app.listen(4002, async () => {
  console.log("Listening on 4002");

  const res = await axios.get("http://localhost:4005/events");

  for (let event of res.data) {
    console.log("Processing event: ", event.type);

    handleEvent(event);
  }
});
