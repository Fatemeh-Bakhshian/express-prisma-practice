// const blogSwagger = {
//   "/api/v1/blog/": {
//     post: {
//       summary: "create new blog",
//       description: "new blog",
//       requestBody: {
//         required: true,
//         content: {
//           "multipart/form-data": {
//             schema: {
//               type: "object",
//               required: ["title", "content"],
//               properties: {
//                 title: { type: "string", default: "title" },

//                 content: {
//                   type: "string",
//                   default: "your content for your blog",
//                 },
//                 image: { type: "string", format: "binary" },
//               },
//             },
//           },
//         },
//       },
//       responses: {
//         201: {
//           description: "success",
//         },
//       },
//       tags: ["blog"],
//     },
//   },
// };

// export default blogSwagger;
