import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

export const uploadSingleFileService = async (req, res) => {
  try {
    let uploadedFile = req.files.file;
    const uploadPath = path.join(
      _dirname,
      "../uploadedFiles",
      Date.now() + "-" + uploadedFile.name
    );
    await uploadedFile.mv(uploadPath, (err) => {
      if (err) {
        return { status: "failed", message: err };
      }
    });
    return {
      status: "success",
      message: "File uploaded successfully",
      filePath: uploadPath,
    };
  } catch (error) {
    return { status: "failed", message: error.toString() };
  }
};
export const readFileService = async (req, res) => {
  try {
    const filename = req.params.fileName;
    const filepath = path.join(_dirname, "../uploadedFiles", filename);
    // console.log(filepath);
    return filepath;
  } catch (error) {
    return { status: "failed", message: error.toString() };
  }
};
export const deleteSingleFileService = async (req, res) => {
  try {
    const filename = req.params.fileName;
    const filepath = path.join(_dirname, "../uploadedFiles", filename);
    // fs.exists(filepath,(exists)=>{
    //   if (exists) {
    //     console.log("file already exists");
    //   } else {
    //     console.log("file not found");
    //   }
    // })
    fs.unlink(filepath, (err) => {
      if (err) {
        return { status: "failed", message: err };
      }
    });
    return { status: "success", message: "file operation successful!" };
  } catch (error) {
    return { status: "failed", message: error.toString() };
  }
};


// export const deleteMultipleFileService = async (req, res) => {
//   try {
//     const filenames = req.body.files;
//     for (let i = 0; i < filenames.length; i++) {
//       const filepath = path.join(_dirname, "../uploadedFiles", filenames[i]);
//       fs.unlink(filepath, (err) => {
//         if (err) {
//           return { status: "failed", message: err };
//         }
//       });
//     }
//     return { status: "success", message: "file deleted successfully" };
//   } catch (error) {
//     return { status: "failed", message: error.toString() };
//   }
// };

// export const uploadMultipleFilesService = async (req, res) => {
//   try {
//     let uploadedFile = req.files.file;
//     for (let i = 0; i < uploadedFile.length; i++) {
//       const uploadPath = path.join(
//         _dirname,
//         "../uploadedFiles",
//         Date.now() + "-" + uploadedFile[i].name
//       );
//       await uploadedFile[i].mv(uploadPath, (err) => {
//         if (err) {
//           return { status: "failed", message: err };
//         }
//       });
//     }
//     return { status: "success", message: "Files uploaded successfully" };
//   } catch (error) {
//     return { status: "failed", message: error.toString() };
//   }
// };