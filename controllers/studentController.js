import {
  createProfileService,
  loginService,
  logoutService,
  updateProfileService,
  viewProfileService,
} from "../services/studentService.js";

export const createProfile = async (req, res) => {
  let result = await createProfileService(req);
  return res.json(result);
};
export const login = async (req, res) => {
  let result = await loginService(req,res);
  return res.json(result);
};
export const viewProfile = async (req, res) => {
  let result = await viewProfileService(req,res);
  return res.json(result);
};
export const updateProfile = async (req, res) => {
  let result = await updateProfileService(req);
  return res.json(result);
};
export const logout = async (req, res) => {
  let result = await logoutService(req,res);
  return res.json(result);
};
