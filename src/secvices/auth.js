import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import UserCollection from '../db/models/User.js';
import SessionCollection from '../db/models/session.js';
import {accessTokenLifetime ,refreshTokenLifetime} from '../constants/users.js';
import {randomBytes} from 'crypto';


export const register = async (payload) => {
  const { email, password } = payload;

  const user = await UserCollection.findOne({ email });
  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const data = await UserCollection.create({ ...payload, password: hashPassword });

  delete data._doc.password;

  return data._doc;
};

export const login = async (payload) => {
  const {email, password} = payload;

  const user = await UserCollection.findOne({ email });

  if (!user) {
    throw createHttpError(409, 'Email or password invalid');
  }

  const comparePassword = await bcrypt.compare(password , user.password);

  if(!comparePassword) {
    throw createHttpError(409, 'Email or password invalid');
  }

  await SessionCollection.deleteOne({userId: user._id});

  const accessToken = randomBytes(30).toString("base64");
  const refreshToken = randomBytes(30).toString("base64");
  const accessTokenValidUntil = new Date(Date.now() + accessTokenLifetime);
  const refreshTokenValidUntil = new Date(Date.now() + refreshTokenLifetime);

  const userSession = await SessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return userSession;
};
