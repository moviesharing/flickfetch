import type { Movie } from '@/types/yts';
import MovieCard from './movie-card';

interface MovieListProps {
  movies: Movie[];
  loading?: boolean;
}

export default function MovieList({ movies, loading = false }: MovieListProps) {
  if (loading) {
    // Simple skeleton loader for movie list
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="animate-pulse bg-card rounded-lg aspect-[2/3]"></div>
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
