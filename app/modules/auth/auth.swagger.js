// const authSwagger = {
//   "/api/v1/auth/signIn": {
//     post: {
//       summary: "signIn a new user",
//       description: "signIn in a new user",
//       requestBody: {
//         required: true,
//         content: {
//           "application/json": {
//             schema: {
//               type: "object",
//               required: ["email", "password", "name"],
//               properties: {
//                 email: { type: "string", default: "example@gmail.com" },
//                 password: { type: "string", default: "12345" },
//                 name: { type: "string", default: "jon deo" },
//               },
//             },
//           },
//         },
//       },
//       responses: {
//         201: {
//           description: "success",
//           "application/json": {
//             schema: {
//               type: "object",
//               properties: {
//                 status: "success",
//                 token: { type: "string", default: "token" },
//               },
//             },
//           },
//         },
//       },
//       tags: ["auth"],
//     },
//   },
//   "/api/v1/auth/login": {
//     post: {
//       summary: "logIn",
//       description: "loging in a user with email and password",
//       requestBody: {
//         required: true,
//         content: {
//           "application/json": {
//             schema: {
//               type: "object",
//               required: ["email", "password"],
//               properties: {
//                 email: { type: "string", default: "example@gmail.com" },
//                 password: { type: "string", default: "12345" },
//               },
//             },
//           },
//         },
//       },
//       responses: {
//         201: {
//           description: "success",
//           "application/json": {
//             schema: {
//               type: "object",
//               properties: {
//                 status: "success",
//                 token: { type: "string", default: "token" },
//               },
//             },
//           },
//         },
//         401: {
//           description: "invalid credentials",
//         },
//       },
//       tags: ["auth"],
//     },
//   },
// };

// export default authSwagger;
