"use client";

import AddPostForm from "@/components/AddPostForm";
import PostCard from "@/components/PostCard";
import { use, useEffect, useState } from "react";
import { Post } from "@/app/types/types";
import Link from "next/link";

export default function Users({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${id}`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await res.json();

        const localPosts = JSON.parse(localStorage.getItem("posts") || "[]");

        const userLocalPosts = localPosts.filter(
          (post: Post) => String(post.userId) === String(id),
        );

        setPosts([...userLocalPosts, ...data]);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [id]);
  return (
    <div>
      <Link href="/">
        <p className="m-5 text-green-600 hover:text-green-500">
          ↩ Back to view page
        </p>
      </Link>

      <div className="flex flex-col items-center m-10">
        <AddPostForm userId={id} setPosts={setPosts} />
        {isLoading ? (
          <p>Loading posts...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : posts.length === 0 ? (
          <p>No posts found</p>
        ) : (
          posts.map((post) => (
            <PostCard key={post.id} title={post.title} body={post.body} />
          ))
        )}
      </div>
    </div>
  );
}
