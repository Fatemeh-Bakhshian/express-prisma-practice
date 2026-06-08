import express from "express";
import swaggerui from "swagger-ui-express";

import swaggerDocs from "./app/configs/swagger/index.js";
import authRoute from "./app/modules/auth/auth.routes.js";
import userRoute from "./app/modules/users/user.routes.js";
import blogRoute from "./app/modules/blogs/blogs.routes.js";

import globalErroreHandler from "./app/configs/globalErroreHandler/index.js";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerDocs));

app.use("files", express.static("uploads"));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);

app.use(globalErroreHandler);

export default app;
