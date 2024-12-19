import mongoose from "mongoose";

const user = new mongoose.Schema({
  name: String,
  email: String,
  resume_url:String,
});

const userModel = mongoose.model("Uniglaze-Users", user);
export default userModel;
