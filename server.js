const express = require("express");
const mongoose = require("mongoose");
const articlesRoute = require("./routes/articles");
const app = express();
const Article = require("./models/article");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost/blog", {
  useNewUrlparser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");

app.listen(5000);

app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  articles = await Article.find().sort({ createdAt: "desc" });

  res.render("articles/index", { articles: articles });
});

app.use("/articles", articlesRoute);
