"use client";
import React, { useState, useEffect } from "react";
import { Search, ArrowUpRight, Calendar, User, Clock } from "lucide-react";
import { MessageCircle, Phone } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  featured: boolean;
}

const categories = [
  "All",
  "Cars",
  "Bikes",
  "Driving ",
  "Safety ",
];

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/blog');
        const data = await res.json();
        if (data.status && data.blogs) {
          const transformedBlogs: Blog[] = data.blogs.map((apiBlog: any) => ({
            id: apiBlog._id,
            title: apiBlog.title,
            excerpt: apiBlog.description,
            content: apiBlog.content,
            image: apiBlog.image,
            author: apiBlog.author,
            date: new Date(apiBlog.createdAt).toLocaleDateString(),
            category: apiBlog.category,
            tags: [apiBlog.category],
            featured: false,
          }));
          if (transformedBlogs.length > 0) {
            transformedBlogs[0].featured = true;
          }
          setBlogs(transformedBlogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredBlog = blogs.find((blog) => blog.featured);

  const dynamicCategories = React.useMemo(() => {
    return ["All", ...new Set(blogs.map((blog) => blog.category))];
  }, [blogs]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading blogs...</p>
        </div>
      </div>
    );
  }

  if (selectedBlog) {
    return (
      <BlogDetail
        blog={selectedBlog}
        onBack={() => setSelectedBlog(null)}
        allBlogs={blogs}
        onBlogSelect={setSelectedBlog}
        categories={dynamicCategories}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div
        className="relative py-24 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop')`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Blog
          </h1>
          <p className="text-lg md:text-xl text-gray-100 drop-shadow-md">
            Ride Smart with Premium Bike Rentals in Bhubaneswar
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        {featuredBlog && (
          <div
            className="relative h-[500px] rounded-3xl overflow-hidden mb-16 cursor-pointer group"
            onClick={() => setSelectedBlog(featuredBlog)}
          >
            <img
              src={featuredBlog.image}
              alt={featuredBlog.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            <div className="absolute top-6 right-6">
              <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-10">
              <div className="flex gap-3 mb-4">
                {featuredBlog.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-5xl font-bold text-white mb-4 max-w-3xl leading-tight">
                {featuredBlog.title}
              </h1>
              <p className="text-white/90 text-lg mb-6 max-w-2xl">
                {featuredBlog.excerpt}
              </p>
              <div className="flex items-center gap-4 text-white/80">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">
                    {featuredBlog.author}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{featuredBlog.date}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {dynamicCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === cat
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search blog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs
            .filter((blog) => !blog.featured)
            .map((blog) => (
              <div
                key={blog.id}
                onClick={() => setSelectedBlog(blog)}
                className="bg-white rounded-2xl overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">
                    {blog.category}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-600 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <User className="w-4 h-4" />
                      <span>{blog.author.split(" ")[0]}</span>
                    </div>
                    <span className="text-sm text-gray-400">{blog.date}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {filteredBlogs.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No blogs found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const BlogDetail = ({
  blog,
  onBack,
  allBlogs,
  onBlogSelect,
  categories
}: {
  blog: Blog;
  onBack: () => void;
  allBlogs: Blog[];
  onBlogSelect: (blog: Blog) => void;
  categories: string[];
}) => {
  // Get recent posts (excluding current blog)
  const recentPosts = allBlogs
    .filter(b => b.id !== blog.id)
    .slice(0, 5);

  // Format content with proper styling
  const formatContent = (content: string) => {
    // Add styling classes to HTML elements
    let formattedContent = content
      // Style headings
      .replace(/<h1>/g, '<h1 class="text-4xl font-bold text-gray-900 mt-12 mb-6 leading-tight">')
      .replace(/<h2>/g, '<h2 class="text-3xl font-bold text-gray-900 mt-10 mb-5 leading-tight">')
      .replace(/<h3>/g, '<h3 class="text-2xl font-bold text-gray-800 mt-8 mb-4">')
      .replace(/<h4>/g, '<h4 class="text-xl font-bold text-gray-800 mt-6 mb-3">')
      // Style paragraphs
      .replace(/<p>/g, '<p class="text-gray-700 text-lg leading-relaxed mb-6">')
      // Style lists
      .replace(/<ul>/g, '<ul class="space-y-3 mb-6 ml-6">')
      .replace(/<ol>/g, '<ol class="space-y-3 mb-6 ml-6 list-decimal">')
      .replace(/<li>/g, '<li class="text-gray-700 text-lg leading-relaxed pl-2"><span class="inline-block w-2 h-2 bg-blue-600 rounded-full mr-3 -ml-6"></span>')
      // Style links
      .replace(/<a /g, '<a class="text-blue-600 hover:text-blue-700 underline font-medium" ')
      // Style blockquotes
      .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-blue-600 pl-6 py-4 my-6 bg-gray-50 italic text-gray-700">');

    return formattedContent;
  };
  const handleWhatsApp = () => {
    window.open("https://wa.me/919090089708", "_blank");
  };

  const handlePhone = () => {
    window.location.href = "tel:+919090089708";
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="fixed left-6 bottom-8 z-50 flex flex-col gap-4">
        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsApp}
          className="h-14 w-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="h-6 w-6" />
        </button>

        {/* Phone Button */}
        <button
          onClick={handlePhone}
          className="h-14 w-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
          title="Call us"
        >
          <Phone className="h-6 w-6" />
        </button>
      </div>
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to blogs
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <article className="flex-1 max-w-4xl">
            {/* Hero Image */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8 shadow-lg">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-3 mb-6">
              {blog.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center gap-6 mb-8 pb-8 border-b-2 border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                  <User className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">{blog.author}</div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{blog.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>5 min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: formatContent(blog.content) }}
            />

            {/* Share Section */}
            <div className="mt-16 pt-8 border-t-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-5">
                Share this article
              </h3>
              <div className="flex flex-wrap gap-3">
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm">
                  Twitter
                </button>
                <button className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-medium transition-colors shadow-sm">
                  LinkedIn
                </button>
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm">
                  Facebook
                </button>
              </div>
            </div>

            {/* Related Posts Section */}
            <div className="mt-16 pt-8 border-t-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Related Posts
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentPosts.slice(0, 3).map((post) => (
                  <div
                    key={post.id}
                    onClick={() => onBlogSelect(post)}
                    className="bg-white rounded-xl overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300 border border-gray-200"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-5">
                      <div className="text-sm text-gray-500 mb-2">
                        {post.category}
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <User className="w-4 h-4" />
                          <span>{post.author.split(" ")[0]}</span>
                        </div>
                        <span className="text-sm text-gray-400">{post.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              {/* Recent Posts */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Recent Posts
                </h2>
                <div className="space-y-5">
                  {recentPosts.map((post) => (
                    <div
                      key={post.id}
                      onClick={() => onBlogSelect(post)}
                      className="cursor-pointer group"
                    >
                      <h3 className="text-gray-800 font-semibold group-hover:text-blue-600 transition-colors leading-snug mb-1">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-500">{post.date}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Categories
                </h2>
                <div className="space-y-3">
                  {categories.filter(cat => cat !== "All").map((category) => (
                    <button
                      key={category}
                      className="w-full text-left px-4 py-2.5 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors font-medium"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default App;