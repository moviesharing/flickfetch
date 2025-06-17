import Container from '@/components/layout/container';
import MovieList from '@/components/movie/movie-list';
import SearchBar from '@/components/movie/search-bar';
import { searchMovies } from '@/lib/yts';
import type { Movie } from '@/types/yts';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/shared/loading-spinner';

interface HomePageProps {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

async function MovieResults({ query, page }: { query?: string; page?: string }) {
  const currentPage = page ? parseInt(page, 10) : 1;
  const movieData = await searchMovies({ 
    query_term: query, 
    limit: 24, 
    page: currentPage,
    sort_by: query ? 'like_count' : 'download_count' // Popular for search, trending for initial
  });
  
  return <MovieList movies={movieData.movies || []} />;
}


export default async function HomePage({ searchParams }: HomePageProps) {
  const query = searchParams?.query;
  const page = searchParams?.page;

  return (
    <Container className="py-6 md:py-10">
      <section className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-2">
          Discover Your Next Favorite Movie
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Search for movies by title, actor, or genre. Explore details, ratings, and find available torrents.
        </p>
      </section>

      <SearchBar />
      
      <Separator className="my-8" />

      <section>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 font-headline">
          {query ? `Search Results for "${query}"` : "Popular Movies"}
        </h2>
        <Suspense fallback={
          <div className="flex justify-center items-center min-h-[300px]">
            <LoadingSpinner size={48} />
          </div>
        }>
          <MovieResults query={query} page={page} />
        </Suspense>
      </section>
      
      {/* Basic Pagination (can be improved) */}
      {/* This part requires client-side interaction for router.push or Link, 
          or a more complex server-side pagination strategy. 
          For simplicity, this example doesn't implement full pagination controls.
          A real app might use a client component for pagination controls.
      */}
    </Container>
  );
}
