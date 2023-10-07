import News from "../models/newsModel.js";
import cloudinaryUpload from "../utils/cloudinaryUpload.js";
import fs from "fs-extra";

export const create = async (req, res) => {
  const data = JSON.parse(req.body.data);
  const file = req.file;
  const url = await cloudinaryUpload
    .upload(file.path, { folder: "news/" })
    .then((result) => result.secure_url);
  const savedNews = await News.create({ ...data, image: url });
  fs.remove(file.path);
  if (savedNews) {
    return res
      .status(201)
      .json({ success: true, message: "Create news successful!" });
  }
};

export const getNewsGroupByCategory = async (req, res) => {
  const findResult = await News.aggregate([
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $group: {
        _id: "$category",
        list: { $push: "$$ROOT" },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        list: {
          $slice: ["$list", 0, 4],
        },
      },
    },
  ]).sort({ category: 1 });

  if (findResult) {
    return res.status(200).json({ news: findResult });
  }
};

export const getNewsById = async (req, res) => {
  const { newsId } = req.params;
  const findResult = await News.findById(newsId);

  if (findResult) {
    return res.status(200).json({ news: findResult });
  }
};

export const getNewsByCategory = async (req, res) => {
  const { name } = req.query;
  const findResult = await News.find({ category: name });
  if (findResult) {
    return res.status(200).json({ news: findResult });
  }
};

export const getNewsByEmployeeId = async (req, res) => {
  const { employeeId } = req.params;
  const findResult = await News.find({ author_id: employeeId });
  if (findResult) {
    return res.status(200).json({ news: findResult });
  }
};

export const deleteNews = async (req, res) => {
  const { id } = req.params;
  const deleteResult = await News.findByIdAndDelete(id);
  if (deleteResult) {
    return res
      .status(200)
      .json({ success: true, message: "Delete news successful!" });
  }
};

export const update = async (req, res) => {
  const file = req.file;
  const data = JSON.parse(req.body.data);
  if (file) {
    const url = await cloudinaryUpload
      .upload(file.path, {
        folder: "news/",
      })
      .then((result) => result.secure_url);
    fs.remove(file.path);
    data.image = url;
  }
  const updateResult = await News.findByIdAndUpdate(data._id, data, {
    new: true,
  });
  if (updateResult) {
    return res
      .status(200)
      .json({ success: true, message: "Update news scuccessful!" });
  }
};