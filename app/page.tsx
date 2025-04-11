import { MovieGrid } from "@/components/MovieGrid";
import { SearchBar } from "@/components/SearchBar";

export default function Home() {
  return (
    <main className="min-h-screen bg-black p-4 px-36">
      {/* <SearchBar /> */}
      <MovieGrid />
    </main>
  );
}

