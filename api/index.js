const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = `mongodb+srv://socail-volunteer:${process.env.USER_PASS}@social-voluenteer.g250ggw.mongodb.net/?retryWrites=true&w=majority&appName=social-voluenteer`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const collection = client
      .db(process.env.DB_NAME)
      .collection(process.env.DB_COLLESTER);

    app.get("/allData", async (req, res) => {
      try {
        const data = await collection.find({}).toArray();
        res.send(data);
        console.log(data);
      } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching data");
      }
    });

    app.get("/", (req, res) => {
      res.send("Hello, I am server");
    });
  } catch (err) {
    console.error("Error:", err);
  }
}

run().catch(console.dir);

module.exports = app;
