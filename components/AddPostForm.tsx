"use client";
import { useState } from "react";
import { Post } from "@/app/types/types";
import { formSchema } from "@/app/lib/validation";

type AddPostFormProps = {
  userId: string;
  setPosts: (posts: Post[] | ((prev: Post[]) => Post[])) => void;
};

export default function AddPostForm({ userId, setPosts }: AddPostFormProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({});

  const handleSubmit = async () => {
    setError(null);
    setErrors({});

    const result = formSchema.safeParse({ title, body });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        title: fieldErrors.title?.[0],
        body: fieldErrors.body?.[0],
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({ title, body, userId }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!res.ok) throw new Error("Failed to create post");

      const data: Post = await res.json();

      const newPost: Post = { ...data, id: Date.now() };

      // Update UI
      setPosts((prev) => [newPost, ...(Array.isArray(prev) ? prev : [])]);

      // Save to localStorage
      const existingPosts: Post[] = JSON.parse(
        localStorage.getItem("posts") || "[]",
      );
      localStorage.setItem(
        "posts",
        JSON.stringify([newPost, ...existingPosts]),
      );

      setTitle("");
      setBody("");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="m-5 border rounded p-4 w-full max-w-[30rem]">
      <h1>Add New Post</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="my-2">
        <p className="font-medium">Title:</p>
        <input
          type="text"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded p-1 px-2 my-1 w-full"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>

      <div className="my-2">
        <p className="font-medium">Body:</p>
        <textarea
          placeholder="Enter post content"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="border rounded p-1 px-2 my-1 w-full"
        />
        {errors.body && <p className="text-red-500 text-sm">{errors.body}</p>}
      </div>

      <div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="border-green-600 bg-green-600 rounded p-1 px-2 font-medium hover:border-green-700 hover:bg-green-700 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Post"}
        </button>
      </div>
    </form>
  );
}
