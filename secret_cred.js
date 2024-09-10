import dotenv from "dotenv";
dotenv.config();

export const mongoURL = process.env.mongoURL;
export const DB_NAME = process.env.DB_NAME;
