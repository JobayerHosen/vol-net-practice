const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.judr2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  // ADD USER API
  try {
    await client.connect();
    console.log("connected");
    const db = client.db("vol-net");
    const usersCollection = db.collection("users");

    app.get("/", (req, res) => {
      res.send("API in up...");
    });

    app.post("/users/addUser", async (req, res) => {
      const doc = req.body;

      const result = await usersCollection.insertOne(doc);
      console.log("inserted user : ", result);

      res.json(doc);
    });
  } catch (err) {
    console.log(err);
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

//-----------------------------

app.listen(port, () => {
  console.log("Listening to port: ", port);
});
