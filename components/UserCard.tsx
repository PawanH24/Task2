import { UserCardProps } from "@/app/types/types";
import Link from "next/link";
export default function UserCard({ id, name, email, company }: UserCardProps) {
  return (
    <div className="border border-white rounded p-4 w-full max-w-[30rem] m-2">
      <p>{name}</p>
      <p>{email}</p>
      <p>{company}</p>
      <div className="mt-3">
        <Link
          href={`/users/${id}?name=${name}&email=${email}`}
          className="border border-blue-700 rounded bg-blue-700 p-1 px-2 font-medium hover:border-blue-800 hover:bg-blue-800"
        >
          View Posts
        </Link>
      </div>
    </div>
  );
}
