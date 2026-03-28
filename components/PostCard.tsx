import { PostCardProps } from "@/app/types/types";

export default function PostCard({ title, body }: PostCardProps) {
  return (
    <div className="border rounded p-1 max-w-[30rem] w-full m-1 p-4">
      <h2 className="font-bold"> {title}</h2>
      <p>{body}</p>
    </div>
  );
}
