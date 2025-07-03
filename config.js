import dotenv from "dotenv";
dotenv.config()

export const Port = process.env.PORT;
export const DataBase_URL = process.env.DATABASE_URL;