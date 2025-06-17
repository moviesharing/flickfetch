
import Container from '@/components/layout/container';
import MovieList from '@/components/movie/movie-list';
import SearchBar from '@/components/movie/search-bar';
import { searchMovies } from '@/lib/yts';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/shared/loading-spinner';
import PaginationControls from '@/components/movie/pagination-controls';

interface HomePageProps {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

const MOVIES_PER_PAGE = 24;
const FEATURED_MOVIES_COUNT = 6;

async function TopRatedMovies() {
  const movieData = await searchMovies({ 
    sort_by: 'rating', 
    limit: FEATURED_MOVIES_COUNT 
  });
  // For marquee, pass marquee={true}
  return <MovieList movies={movieData.movies || []} itemsPerPage={FEATURED_MOVIES_COUNT} marquee={true} />;
}

async function MovieResults({ query, page }: { query?: string; page?: string }) {
  const currentPage = page ? parseInt(page, 10) : 1;
  const movieData = await searchMovies({ 
    query_term: query, 
    limit: MOVIES_PER_PAGE, 
    page: currentPage,
    sort_by: query ? 'like_count' : 'download_count'
  });
  
  const totalMovies = movieData.movie_count || 0;
  const totalPages = Math.ceil(totalMovies / MOVIES_PER_PAGE);
  // Ensure page_number from API is used for accurate hasNextPage/hasPrevPage
  const apiCurrentPage = movieData.page_number || currentPage; 
  const hasNextPage = apiCurrentPage < totalPages;
  const hasPrevPage = apiCurrentPage > 1;

  return (
    <>
      <MovieList movies={movieData.movies || []} itemsPerPage={MOVIES_PER_PAGE} />
      {totalPages > 0 && ( // Show pagination only if there are results
        <PaginationControls
          currentPage={apiCurrentPage}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
        />
      )}
    </>
  );
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

      <section className="mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 font-headline">
          Top Rated Movies
        </h2>
        <Suspense fallback={
          <div className="flex overflow-hidden w-full py-4"> {/* Basic skeleton for marquee */}
            {Array.from({ length: FEATURED_MOVIES_COUNT }).map((_, index) => (
              <div key={index} className="flex-shrink-0 px-2">
                <div className="w-48 md:w-56 h-[calc(var(--w-48)/2*3)] md:h-[calc(var(--w-56)/2*3)] animate-pulse bg-card rounded-lg shadow-md"></div>
              </div>
            ))}
          </div>
        }>
          <TopRatedMovies />
        </Suspense>
      </section>

      <Separator className="my-8" />

      <section>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 font-headline">
          {query ? `Search Results for "${query}"` : "Popular Movies"}
        </h2>
        <Suspense fallback={
          <div className="flex flex-col justify-center items-center min-h-[300px]">
            <MovieList loading={true} itemsPerPage={MOVIES_PER_PAGE} />
            <div className="flex items-center justify-center space-x-4 py-8">
              <div className="h-9 w-28 bg-muted rounded-md animate-pulse"></div>
              <div className="h-6 w-24 bg-muted rounded-md animate-pulse"></div>
              <div className="h-9 w-24 bg-muted rounded-md animate-pulse"></div>
            </div>
          </div>
        }>
          <MovieResults query={query} page={page} />
        </Suspense>
      </section>
    </Container>
  );
}
