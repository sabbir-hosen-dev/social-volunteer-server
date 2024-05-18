const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const port = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const uri = `mongodb+srv://socail-volunteer:${process.env.USER_PASS}@social-voluenteer.g250ggw.mongodb.net/?retryWrites=true&w=majority&appName=social-voluenteer`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  tls: true,
  tlsAllowInvalidCertificates: false,
  tlsAllowInvalidHostnames: false,
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const collection = client
      .db(process.env.DB_NAME)
      .collection(process.env.DB_COLLESTER);

    const userCollection = client
      .db(process.env.DB_NAME)
      .collection("select-volunteer");

    app.post("/postEvent", async (req, res) => {
      try {
        const data = await collection.insertOne(req.body);
        res.send(data);
      } catch (err) {
        console.log(err);
        res.status(500).send("Error adding event");
      }
    });

    app.delete("/deleteAttendEvent/:id", async (req, res) => {
      try {
        const data = await userCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        res.send(data);
      } catch (error) {
        console.log(error);
        res.status(500).send("Error deleting event");
      }
    });

    app.get("/attendEvent", async (req, res) => {
      try {
        const data = await userCollection.find({}).toArray();
        res.send(data);
      } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching events");
      }
    });

    app.delete("/deleteItem/:id", async (req, res) => {
      try {
        const data = await userCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        res.send(data);
      } catch (error) {
        console.log(error);
        res.status(500).send("Error deleting item");
      }
    });

    app.get("/userData", async (req, res) => {
      try {
        const data = await userCollection.find({ email: req.query.email }).toArray();
        res.send(data);
      } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching user data");
      }
    });

    app.post("/addData", async (req, res) => {
      try {
        const data = await userCollection.insertOne(req.body);
        res.send(data);
      } catch (err) {
        console.log(err);
        res.status(500).send("Error adding data");
      }
    });

    app.get("/allData", async (req, res) => {
      try {
        const data = await collection.find({}).toArray();
        res.send(data);
      } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching data");
      }
    });

    app.get("/", (req, res) => {
      res.send("Hello, I am server");
    });

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Error:", err);
  }
}

run().catch(console.dir);
