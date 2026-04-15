const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const postsRouter = require("./routes/posts");

const app = express();
const PORT = process.env.PORT || 3000;

const frontendDir = path.join(__dirname, "frontend", "dist");

async function connectToDatabase() {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI environment variable is not set.");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

app.use(express.json());
app.use("/api/posts", postsRouter);

app.use(express.static(frontendDir));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendDir, "index.html"));
});

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log("Mounted routers:");
    console.log("  /api/posts -> routes/posts.js");
  });
});
