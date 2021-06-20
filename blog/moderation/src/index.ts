import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

type ModerationType = {
  type: "CommentCreated";
  data: CommentsType;
};

enum StatusEnum {
  Aproved = "aproved",
  Rejected = "rejected",
  Pending = "pending",
}

type CommentsType = {
  id: any;
  text: string;
  postID: any;
  status: StatusEnum;
};

const app = express();

app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body as ModerationType;

  console.log("Received Event: ", type);

  if (type === "CommentCreated") {
    const { id, text, postID } = data;

    const status = data.text.includes("orange")
      ? StatusEnum.Rejected
      : StatusEnum.Aproved;

    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: {
        id,
        postID,
        text,
        status,
      },
    });
  }
});

app.listen(4003, () => {
  console.log("Listening on 4003");
});
