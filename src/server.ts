import express from "express";
import swaggerUi from "swagger-ui-express";

import { routes } from "./routes";
import swaggerSetup from "./swagger.json";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup));

app.use(routes);

app.listen(3333, () => {
  console.log("Server started successfully on http://localhost:3333");
});
