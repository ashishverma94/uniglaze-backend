import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  position: String,
  resume_url: String,
});

const jobModel = mongoose.model("Uniglaze-Job", jobSchema);
export default jobModel;
