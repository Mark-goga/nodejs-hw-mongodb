// import createHttpError from "http-errors";
import * as authServices from "../secvices/auth.js";

function setupSession(res, session) {
  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expire: new Date(Date.now() + session.refreshTokenValidUntil),
  });


  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expire: new Date(Date.now() + session.refreshTokenValidUntil),

  });
}

export const signupController = async (req , res) => {
  const data = await authServices.register(req.body);

  res.status(201).json({
    status: 201,
    message: "Successfully registered a user!",
    data,
  });
};
export const singinController = async (req , res) => {
  const session = await authServices.login(req.body);

  setupSession(res , session);

  res.status(200).json({
    status: 200,
    message: "Successfully logged in an user!",
    data :{
      accessToken: session.accessToken,
    },
  });
};

export const refreshController = async (req , res) => {
  const {refreshToken , sessionId} = req.cookies;

  const session = await authServices.refresh({refreshToken , sessionId});

  setupSession(res , session);

  res.status(200).json({
    status: 200,
    message: "Successfully refreshed a session!",
    data :{
      accessToken: session.accessToken,
    },
  });
};
export const logoutController = async (req, res) => {
  const {sessionId} = req.cookies;
  if(sessionId) {
    authServices.logout(sessionId);
  }
  res.clearCookie("sessionId");
  res.clearCookie("refreshToken");

  res.status(204).send();
};
