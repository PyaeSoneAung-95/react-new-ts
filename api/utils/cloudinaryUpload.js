import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "fooddeliveryservice",
  api_key: "463393599324996",
  api_secret: "PWTFFgCaVuIKWQZ35KMIVpnOtpE",
});

const cloudinaryUpload = cloudinary.uploader;

export default  cloudinaryUpload;
