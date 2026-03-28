"use client";
import AddPostForm from "@/components/AddPostForm";
import PostCard from "@/components/PostCard";
import SearchBar from "@/components/SearchBar";
import UserCard from "@/components/UserCard";
import { useEffect, useState } from "react";
import { User } from "@/app/types/types";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await res.json();
        setUsers(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const searchTerm = search.toLowerCase();

    return (
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
    );
  });
  return (
    <div className="flex flex-col items-center m-10">
      <h1 className="font-bold">User List</h1>
      <SearchBar setSearch={setSearch} />
      {isLoading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredUsers.length === 0 ? (
        <p>No users found</p>
      ) : (
        filteredUsers.map((user) => (
          <UserCard
            key={user.id}
            id={user.id}
            name={user.name}
            email={user.email}
            company={user.company.name}
          />
        ))
      )}
    </div>
  );
}
