import dotenv from "dotenv";
import { parseBoolean } from "../utils/parsers/parseBoolean";
import { parseNumber } from "../utils/parsers/parseNumber";
import { parseString } from "../utils/parsers/parseString";

dotenv.config();

export const vars = {
    env: parseString(process.env.NODE_ENV, "develop"),
    logs: process.env.NODE_ENV === "production" ? "combined" : "dev",
    isLocal: parseBoolean(process.env.IS_LOCAL, false),
    port: parseNumber(process.env.PORT, 3000),
    origin: process.env.ALLOWED_ORIGIN,
    apiKey: process.env.LIVEKIT_API_KEY,
    apiSecret: process.env.LIVEKIT_API_SECRET,
};
