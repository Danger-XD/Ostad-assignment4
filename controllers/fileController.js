import {
  deleteSingleFileService,
  readFileService,
  uploadSingleFileService,
} from "../services/fileService.js";

export const uploadSingleFile = async (req, res) => {
  let result = await uploadSingleFileService(req);
  return res.status(200).json(result);
};
export const readFile = async (req, res) => {
  let result = await readFileService(req);
  return res.sendFile(result);//this is unique because it will show the file directly
};
export const deleteSingleFile = async (req, res) => {
  let result = await deleteSingleFileService(req);
  return res.status(200).json(result);
};

// export const uploadMultipleFiles = async (req, res) => {
//   let result = await uploadMultipleFilesService(req);
//   return res.status(200).json(result);
// };
// export const deleteMultipleFile = async (req, res) => {
//     let result = await deleteMultipleFileService(req);
//     return res.status(200).json(result);
//   };
