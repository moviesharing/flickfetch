
import type { Movie } from '@/types/yts';
import MovieCard from './movie-card';

interface MovieListProps {
  movies: Movie[];
  loading?: boolean;
  itemsPerPage?: number;
}

const DEFAULT_ITEMS_PER_PAGE = 24;

export default function MovieList({ movies, loading = false, itemsPerPage = DEFAULT_ITEMS_PER_PAGE }: MovieListProps) {
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

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
