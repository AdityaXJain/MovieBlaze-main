import Link from "next/link";
import { SearchBar } from "./SearchBar";

export function NavBar() {
  return (
    <nav className="bg-black text-primary p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl text-gray-100 font-bold">
          MovieBlaze
        </Link>
        <SearchBar />
        <div>
          <Link href="/login" className="mr-4 hover:text-accent transition duration-300">
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-secondary hover:bg-accent px-4 py-2 rounded-xl transition duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}

