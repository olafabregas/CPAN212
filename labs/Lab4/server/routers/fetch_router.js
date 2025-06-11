import express from "express";
import fs from "fs";
import lodash from "lodash";
import path from "path";
import { uploadsDir } from "../middleware/multer.js";

const router = express.Router();

router.get("/single", (req, res) => {
  const uploadArray = fs.readdirSync(uploadsDir);
  const randomFile = lodash.sample(uploadArray);
  if (!randomFile) {
    return res.status(404).json({ message: "Empty directory" });
  }
  res.sendFile(path.join(uploadsDir, randomFile));
});

router.get("/multiple", (req, res) => {
  try {
    const uploadArray = fs.readdirSync(uploadsDir);
    if (!uploadArray.length) {
      return res.status(404).json({ message: "No images found" });
    }

    const selectedImages = lodash.sampleSize(uploadArray, 6);
    res.status(200).json(uploadArray);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching images",
      error,
    });
  }
});

router.get("/file/:filename", (req, res) => {
  const { filename } = req.params;
  const fullPath = path.join(uploadsDir, filename);
  if (!fs.existsSync(fullPath)) {
    return res.status(404).json({ message: "File not found" });
  }
  res.sendFile(fullPath);
});

export default router;
