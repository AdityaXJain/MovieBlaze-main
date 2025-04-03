import { MovieGrid } from "@/components/MovieGrid";
import { SearchBar } from "@/components/SearchBar";

export default function Home() {
  return (
    <main className="min-h-screen bg-black p-4 max-w-7xl mx-auto">
      {/* <SearchBar /> */}
      <MovieGrid />
    </main>
  );
}

