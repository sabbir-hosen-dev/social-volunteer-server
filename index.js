const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const PORT = 5001;
const app = express();
app.use(cors());
app.use(express.json())

const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = `mongodb+srv://socail-volunteer:${process.env.USER_PASS}@social-voluenteer.g250ggw.mongodb.net/?retryWrites=true&w=majority&appName=social-voluenteer`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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

    const collection = client.db(process.env.DB_NAME).collection(process.env.DB_COLLESTER);

    app.get("/allData",async (req,res) =>{
      try {
        const data = await collection.find({}).toArray();
        res.send(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    })


    app.get("/", (req, res) => {
      res.send("Hello, I am server");
    });

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Error:", err);
  }
}

run().catch(console.dir);
module.exports = app;