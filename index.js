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

  try{

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
