// import authSwagger from "../../modules/auth/auth.swagger.js";
// import userSwagger from "../../modules/users/user.swagger.js";
// import blogSwagger from "../../modules/blogs/blogs.swagger.js";

// const swaggerDocs = {
//   openapi: "3.0.0",
//   info: { title: "blog-api-task", version: "1.0.0" },
//   components: {
//     securitySchemes: {
//       bearerAuth: {
//         type: "http",
//         scheme: "bearer",
//         bearerFormat: "JWT",
//       },
//     },
//   },
//   paths: {
//     ...authSwagger,
//     ...userSwagger,
//     ...blogSwagger,
//   },
//   security: [
//     {
//       bearerAuth: [],
//     },
//   ],
// };

// export default swaggerDocs;

import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./app/**/*.routes.js"], 
};

const swaggerDocs = swaggerJsdoc(options);

export default swaggerDocs;
