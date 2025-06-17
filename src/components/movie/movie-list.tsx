
import type { Movie } from '@/types/yts';
import MovieCard from './movie-card';

interface MovieListProps {
  movies: Movie[];
  loading?: boolean;
  itemsPerPage?: number;
  marquee?: boolean;
}

const DEFAULT_ITEMS_PER_PAGE = 24;

export default function MovieList({ movies, loading = false, itemsPerPage = DEFAULT_ITEMS_PER_PAGE, marquee = false }: MovieListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {Array.from({ length: itemsPerPage }).map((_, index) => (
          <div key={index} className="animate-pulse bg-card rounded-lg aspect-[2/3] shadow-md"></div>
        ))}
      </div>
    );
  }
  
  if (!movies || movies.length === 0) {
    return <p className="text-center text-muted-foreground text-lg col-span-full my-8">No movies found.</p>;
  }

  if (marquee) {
    const duplicatedMovies = [...movies, ...movies]; // Duplicate for seamless loop
    return (
      <div className="w-full overflow-hidden group" tabIndex={0} aria-label="Featured movies carousel">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] whitespace-nowrap py-4">
          {duplicatedMovies.map((movie, index) => (
            <div key={`${movie.id}-marquee-${index}`} className="flex-shrink-0 px-2">
              <div className="w-48 md:w-56"> {/* Consistent width for cards in marquee */}
                  <MovieCard movie={movie} disableHoverScale={true} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
