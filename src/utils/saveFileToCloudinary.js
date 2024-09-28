import {v2 as cloudinary}from 'cloudinary';
import fs from 'node:fs/promises';
import { env } from './env.js';

const cloud_name = env('CLOUDINARY_CLOUD_NAME');
const api_key = env('CLOUDINARY_API_KEY');
const api_secret = env('CLOUDINARY_API_SECRET');

cloudinary.config({
  cloud_name,
  api_key,
  api_secret
});

export default async function saveFileToCloudinary(file , folder) {
  const respons = await cloudinary.uploader.upload(file.path , {folder});
  await fs.unlink(file.path);

  return respons.secure_url;
}
