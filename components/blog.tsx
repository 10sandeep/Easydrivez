// "use client";
// import { User } from "lucide-react";

// export default function Blog({ blog, onClick }: any) {
//   return (
//     <div
//       onClick={onClick}
//       className="bg-white rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition"
//     >
//       <div className="h-48 overflow-hidden">
//         <img
//           src={blog.image}
//           alt={blog.title}
//           className="w-full h-full object-cover hover:scale-105 transition"
//         />
//       </div>
//       <div className="p-5">
//         <p className="text-sm text-gray-500 mb-1">{blog.category}</p>
//         <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
//           {blog.title}
//         </h3>
//         <p className="text-gray-600 text-sm line-clamp-2">
//           {blog.excerpt}
//         </p>
//         <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
//           <User className="w-4 h-4" />
//           {blog.author}
//         </div>
//       </div>
//     </div>
//   );
// }
