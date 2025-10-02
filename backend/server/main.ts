import express from "express";
import cors from "cors";

import * as authRouter from "../auth/routes";
import * as productRouter from "../products/routes";

function main() {
  const app = express();

  // Configure CORS
  app.use(cors({
    origin: 'http://localhost:3001', // Frontend URL
    credentials: true
  }));
  
  app.use(express.json());
  app.use("/auth", authRouter.urls());
  app.use("/products", productRouter.urls());

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

main();
