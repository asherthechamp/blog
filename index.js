const express = require("express");
const mongoose = require("mongoose");
const articlesRoute = require("./routes/articles");
const app = express();
const Article = require("./models/article");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));

const user = "asherthechamp";
const pass = "MERNdev123";
const db = "blog";
const cls = "cluster0.odnxk";
// `mongodb+srv://${user}:${pass}@${cls}.mongodb.net/${db}?retryWrites=true&w=majority`,


mongoose.connect(
  `mongodb+srv://${user}:${pass}@${cls}.mongodb.net/${db}?retryWrites=true&w=majority`,
  {
    useNewUrlparser: true,
    useUnifiedTopology: true,
  }
);

app.set("view engine", "ejs");

app.listen(5000);

app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  articles = await Article.find().sort({ createdAt: "desc" });

  res.render("articles/index", { articles: articles });
});

app.use("/articles", articlesRoute);
