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
        <div className="flex space-x-4">
          <Link href="/popular" className="hover:text-accent transition duration-300 text-gray-100">
            Popular
          </Link>
          <Link href="/top-rated" className="hover:text-accent transition duration-300 text-gray-100">
            Top Rated
          </Link>
          <Link href="/upcoming" className="hover:text-accent transition duration-300 text-gray-100">
            Upcoming
          </Link>
          <Link href="/upcoming" className="hover:text-accent transition duration-300">
            
          </Link>
        </div>
        <div>
          <Link href="/login" className="bg-secondary hover:bg-accent px-4 py-2  rounded-l-2xl transition duration-300">
            login
          </Link>
          <Link
            href="/signup"
            className="bg-secondary hover:bg-accent px-4 py-2 rounded-r-2xl shadow-md transition duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}

