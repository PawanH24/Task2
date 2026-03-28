import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function SearchBar({ setSearch }) {
  return (
    <div className="flex items-center border border-white rounded p-1 m-5 max-w-[30rem] w-full">
      <MagnifyingGlassIcon className="h-5 w-5 flex mx-1" />
      <input
        type="text"
        placeholder="Enter Text"
        className=" outline-none p-1"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
