import Employee from "../models/employeeModel.js";
import cloudinaryUpload from "../utils/cloudinaryUpload.js";
import fs from "fs-extra";

export const getAll = async (req, res) => {
  const findResult = await Employee.find({ role: "employee" });
  if (findResult) {
    return res.status(200).json({ employees: findResult });
  }
};

export const login = async (req, res) => {
  const data = req.body;
  const findResult = await Employee.findOne({ ...data, status: true }).select(
    "-password -__v -updatedAt -createdAt"
  );
  if (findResult) {
    return res
      .status(200)
      .json({ success: true, message: "Login successful!", user: findResult });
  } else {
    return res
      .status(404)
      .json({ success: false, message: "No user found!", user: null });
  }
};

export const signup = async (req, res) => {
  const data = req.body;
  const findResult = await Employee.findOne({ email: data.email });
  if (findResult) {
    return res
      .status(409)
      .json({ success: false, message: "Employee already exists!" });
  }
  const savedResult = await Employee.create(data);
  if (savedResult) {
    return res
      .status(201)
      .json({ success: true, message: "Register successful!" });
  }
};

export const update = async (req, res) => {
  const data = req.body;
  const updateResult = await Employee.findByIdAndUpdate(data._id, data, {
    new: true,
  });
  if (updateResult) {
    return res.status(200).json({
      success: true,
      message: "Update successful!",
      data: updateResult,
    });
  }
};

export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const file = req.file;
  const url = await cloudinaryUpload
    .upload(file.path, {
      folder: "profile/",
    })
    .then((res) => res.secure_url);
  fs.remove(file.path);
  const updateResult = await Employee.findByIdAndUpdate(
    id,
    {
      image: url,
    },
    { new: true }
  );
  if (updateResult) {
    return res.status(200).json({
      success: true,
      data: updateResult,
      message: "Update profile successful!",
    });
  }
};

export const updateStatus=async(req, res)=>{
  const {id}=req.params;
  const updateResult=await Employee.findByIdAndUpdate(id, {status: true})
  if(updateResult){
    return res.status(200).json({success: true, message: "Update successful!"});
  }
}