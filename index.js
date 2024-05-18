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

    app.post("/postEvent",async (req,res) => {
      try{
        const data = await collection.insertOne(req.body);
        res.send(data)
      }catch (err) {console.log(err)}
    })

    app.delete("/deleteAttendEvent/:id", async(req,res) => {
      try {
          const data = await userCollection.deleteOne({_id: new ObjectId(req.params.id)});
          res.send(data)
      } catch (error) {
        
      }
    })


    app.get("/attendEvent", async (req,res) => {
      try {
        const data = await userCollection.find({}).toArray()
        res.send(data)
      } catch (error) {
        console.log(error)
      }
    })

    app.delete("/deleteItem/:id" , async (req,res) => {
      try {
        const data = await userCollection.deleteOne({_id: new ObjectId(req.params.id)})
        res.send(data)
      } catch (error) {
        console.log(error)
      }
    })



    app.get("/userData", async (req, res) => {
      try {
        const data = await userCollection.find({ email: req.query.email }).toArray();
        res.send(data)
      } catch (error) {
        console.log(error)
      }
    });

    app.post("/addData", async (req, res) => {
      try {
        const data = await userCollection.insertOne(req.body);
        res.send(data);
      } catch (err) {
        console.log(err);
        res.status(200, "not send data on database");
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
  } catch (err) {
    console.error("Error:", err);
  }

  app.listen(PORT, () => {
    console.log(`server runing at http://localhost:${PORT}`);
  });
}

run().catch(console.dir);
