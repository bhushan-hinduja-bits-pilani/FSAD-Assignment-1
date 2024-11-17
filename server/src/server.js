import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import connectToDb from "../src/models/db.js";
import cors from "cors";


const app = express();
app.use(bodyParser.json());
app.use(cors());


let db;

// async function connectToDb() {
//   await client.connect();
//   db = client.db(dbName);
//   console.log("Connected to MongoDB.");
// }

// connectToDb().catch(console.error);

try {
    db = await connectToDb();
}
catch(err){
    console.error(err);
}

// Middleware for authentication
const authenticate = async (req, res, next) => {
  const token = req.header("Authorization");
  next();
//   if (!token) return res.status(401).send("Access denied. No token provided.");

//   try {
//     const decoded = jwt.verify(token, "jwtPrivateKey");
//     req.user = decoded;
//     next();
//   } catch (ex) {
//     res.status(400).send("Invalid token.");
//   }
};

// Routes

// POST /register
app.post("/register", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    const result = await db.collection("User").insertOne({
      first_name,
      last_name,
      email,
      password,
    });
    res.status(201).send("User registered successfully.");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// POST /login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await db.collection("users").findOne({ email });
  if (!user) return res.status(400).send("Invalid email or password.");

//   const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = jwt.sign({ _id: user._id }, "jwtPrivateKey");
  res.send({ token });
});

// POST /resetPassword
app.post("/resetPassword", authenticate, async (req, res) => {
  const { old_password, new_password, email } = req.body;

  const user = await db.collection("users").findOne({ email });
  if (!user) return res.status(404).send("User not found.");

//   const validPassword = await bcrypt.compare(old_password, user.password);
  if (!validPassword) return res.status(400).send("Old password is incorrect.");

//   const hashedPassword = await bcrypt.hash(new_password, 10);
  await db.collection("users").updateOne({ email }, { $set: { password: hashedPassword } });
  res.send("Password updated successfully.");
});

// POST /logout
app.post("/logout", authenticate, (req, res) => {
  res.send("Logged out successfully.");
});

// GET /user
app.get("/user", authenticate, async (req, res) => {
  const { email } = req.query;

  const user = await db.collection("users").findOne({ email });
  if (!user) return res.status(404).send("User not found.");

  res.send({
    id: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
  });
});

// POST /book
app.post("/book", authenticate, async (req, res) => {
  const { title, author, genre, condition, owner_id } = req.body;

  try {
    const result = await db.collection("Book").insertOne({
      title,
      author,
      genre,
      condition,
      owner_id: new ObjectId(owner_id),
      availability_status: "available",
    });
    res.status(201).send("Book added successfully.");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// PATCH /book
app.patch("/book", authenticate, async (req, res) => {
  const { id } = req.query;
  const updates = req.body;

  try {
    const result = await db.collection("Book").updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );
    if (result.matchedCount === 0) return res.status(404).send("Book not found.");

    res.send("Book updated successfully.");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// DELETE /book
app.delete("/book", authenticate, async (req, res) => {
  const { id } = req.query;

  try {
    const result = await db.collection("Book").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).send("Book not found.");

    res.send("Book deleted successfully.");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// GET /book
app.get("/book", authenticate, async (req, res) => {
  const { title, owner_id } = req.query;

  const query = {};
  if (title) query.title = title;
  if (owner_id) query.owner_id = new ObjectId(owner_id);

  const books = await db.collection("Book").find(query).toArray();
  res.send(books);
});

// POST /bookSearch
app.get("/books", authenticate, async (req, res) => {
    console.log(req)
    const { title, genre, author, availability_status } = req.query;

    const query = {};
    if (title) query.title = title;
    if (genre) query.genre = genre;
    if (author) query.author = author;
    if (availability_status) query.availability_status = availability_status;
    console.log(query)
    const books = await db.collection("Book").find(query).toArray();
    res.send(books);
});

// Server setup
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
