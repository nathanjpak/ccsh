import dotenv from "dotenv";

dotenv.config();

export const apiURL = `${process.env.API_URL}/clinicianstatus`;
export const emailPassword = process.env.EMAIL_PASSWORD || "";
