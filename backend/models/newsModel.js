const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    date: Date,
    content: String,
    category: String,
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee",
    },
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model("news", newsSchema);

module.exports = News;
