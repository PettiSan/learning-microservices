import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app = express();

const url = "http://localhost:";

app.use(bodyParser.json());
app.use(cors());

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  // !Posts Service
  axios
    .post(`${url}4000/events`, { type })
    .catch((err) => console.log(err.message));

  // !Comments Service
  axios
    .post(`${url}4001/events`, { type })
    .catch((err) => console.log(err.message));

  // !Query Service
  axios
    .post(`${url}4002/events`, { type, data })
    .catch((err) => console.log(err.message));

  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
