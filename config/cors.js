import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const allowedOrigins = [
  "https://finance-dashboard-psi-sand.vercel.app",
  "http://localhost:5174", // za lokalni razvoj
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export const corsMiddleware = cors(corsOptions);
