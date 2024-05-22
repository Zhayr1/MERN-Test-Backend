import { matchedData, validationResult } from "express-validator";
import authService from "../services/auth.service.js";
import { logger } from "../utils/logger.util.js";

const registerUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const token = await authService.registerUser(req, res);
    res.status(201).json({
      success: true,
      accessToken: token,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = matchedData(req);

    const { token } = await authService.loginUser(email, password);

    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  registerUser,
  loginUser,
};
