import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: {
      type: String,
      enum: ["employee", "admin"],
      default: "employee",
    },
    status: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/fooddeliveryservice/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1695975532/cute-penguin-get-mad-ready-to-fight-isolated-cartoon-animal-illustration-flat-style-sticker-icon-design-premium-logo-mascot-character-vector_qlimq9.jpg",
    },
    phone_numbers: [String],
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("employees", employeeSchema);

export default Employee;
