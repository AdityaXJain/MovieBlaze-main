import { MovieCard } from "@/components/MovieCard";
import { SearchBar } from "@/components/SearchBar";

const API_KEY = "3fd2be6f0c70a2a598f084ddfb75487c";

async function searchMovies(query: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }
  const data = await res.json();
  return data.results;
}

export default async function SearchResults({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const query = searchParams.query;
  const movies = await searchMovies(query);

  return (
    <main className="min-h-screen p-4 max-w-7xl mx-auto">
      {/* <SearchBar /> */}
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie:any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
}