// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import BlogCard from "@/components/blog";

// export default function HomePage() {
//   const [blogs, setBlogs] = useState<any[]>([]);

//   useEffect(() => {
//     fetch("/api/blog")
//       .then(res => res.json())
//       .then(data => {
//         if (data.status) {
//           setBlogs(data.blogs.slice(0, 3)); // 👈 ONLY 3 BLOGS
//         }
//       });
//   }, []);

//   return (
//     <section className="max-w-7xl mx-auto px-6 py-20">
//       <div className="flex items-center justify-between mb-10">
//         <h2 className="text-3xl font-bold">Latest Blogs</h2>
//         <Link
//           href="/blog"
//           className="text-blue-600 font-semibold hover:underline"
//         >
//           View all →
//         </Link>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {blogs.map(blog => (
//           <BlogCard key={blog._id} blog={blog} />
//         ))}
//       </div>
//     </section>
//   );
// }
