// src/pages/Home.tsx
import { useEffect, useState } from "react";
import { CircularProgress, Avatar, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import axios from "axios";
import { toast } from "react-toastify";

interface Post {
  _id: string;
  user: { username: string; profileimage: string };
  image: string;
  caption: string;
  likes: number;
  createdAt: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/posts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data.posts);
      } catch (err: any) {
        console.error("❌ Failed to fetch posts", err);
        toast.error("Could not load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center py-6">
      {posts.length === 0 && (
        <p className="text-white">No posts to show yet.</p>
      )}

      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-gray-800 w-full max-w-md mb-6 rounded-lg shadow-md overflow-hidden"
        >
          {/* Post Header */}
          <div className="flex items-center gap-4 p-4">
            <Avatar src={post.user.profileimage} />
            <span className="text-white font-medium">{post.user.username}</span>
          </div>

          {/* Post Image */}
          <img
            src={post.image}
            alt="Post"
            className="w-full object-cover max-h-[500px]"
          />

          {/* Post Actions */}
          <div className="flex items-center gap-4 px-4 py-2 text-white">
            <IconButton>
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton>
              <CommentIcon />
            </IconButton>
            <span>{post.likes} likes</span>
          </div>

          {/* Caption */}
          <div className="px-4 pb-4 text-white">
            <span className="font-medium">{post.user.username}</span> {post.caption}
          </div>
        </div>
      ))}
    </div>
  );
}

