import Image from "next/image";
import Link from "next/link";
import MovieFeedback from "./MovieFeedback";

const API_KEY = "3fd2be6f0c70a2a598f084ddfb75487c";

async function getMovieDetails(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos,watch/providers`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch movie details");
  }
  return res.json();
}

// Server component for the page
export default async function MoviePage({ params }: { params: { id: string } }) {
  const movie = await getMovieDetails(params.id);
  const trailer = movie.videos.results.find(
    (video: any) => video.type === "Trailer" && video.site === "YouTube"
  );
  const providers = movie["watch/providers"].results.US?.flatrate || [];

  return (
    <main className="min-h-screen bg-white my-4 rounded-xl w-full p-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={750}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold text-primary mb-4">{movie.title}</h1>
          <p className="text-lg text-black mb-4">{movie.overview}</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="font-semibold text-primary">Release Date:</p>
              <p>{new Date(movie.release_date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="font-semibold text-primary">Runtime:</p>
              <p>{movie.runtime} minutes</p>
            </div>
            <div>
              <p className="font-semibold text-primary">Rating:</p>
              <p>{movie.vote_average.toFixed(1)} / 10</p>
            </div>
            <div>
              <p className="font-semibold text-primary">Genres:</p>
              <p>{movie.genres.map((g: { name: string }) => g.name).join(', ')}</p>
            </div>
          </div>
          {trailer && (
            <a
              href={`https://www.youtube.com/watch?v=${trailer.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-80 transition duration-300 mb-6"
            >
              Watch Trailer
            </a>
          )}
          {providers.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-primary mb-2">Available on:</h2>
              <div className="flex flex-wrap gap-2">
                {providers.map((provider: any) => (
                  <div key={provider.provider_id} className="flex items-center bg-white rounded-full px-3 py-1 shadow">
                    <Image
                      src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                      alt={provider.provider_name}
                      width={20}
                      height={20}
                      className="rounded-full mr-2"
                    />
                    <span className="text-sm">{provider.provider_name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <MovieFeedback movieId={params.id} />
          <Link href="/" className="inline-block mt-6 text-secondary hover:text-accent transition duration-300">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

