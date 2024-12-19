import {
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "../utils/firebase.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import jobModel from "../models/jobs.models.js";

const storageEngine = multer.memoryStorage();
const upload = multer({ storage: storageEngine });

export const jobApplication = async (req, res) => {
  try {
    upload.single("resume")(req, res, async (err) => {
      if (err) {
        return res
          .status(400)
          .json({ error: "Error uploading file", message: err.message });
      }

      const file = req.file;

      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const fileName = `${uuidv4()}.${file.mimetype.split("/")[1]}`;

      const fileRef = ref(storage, `uniglaze/resumes/${fileName}`);

      const metadata = {
        contentType: file.mimetype,
        contentDisposition: "inline",
      };

      try {
        await uploadBytes(fileRef, file.buffer, metadata);

        const resumeUrl = await getDownloadURL(fileRef);

        console.log(resumeUrl);

        const { name, email, phone, position } = req.body;

        const newUser = new jobModel({
          name,
          email,
          phone,
          position,
          resume_url: resumeUrl,
        });

        await newUser.save();

        return res.status(200).json({
          message: "Job application submitted successfully",
          user: newUser,
        });
      } catch (firebaseErr) {
        return res.status(500).json({
          error: "Error uploading to Firebase",
          message: firebaseErr.message,
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      error: "An error occurred while processing the application",
      message: err.message,
    });
  }
};
