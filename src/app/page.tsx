
import Container from '@/components/layout/container';
import MovieList from '@/components/movie/movie-list';
import SearchBar from '@/components/movie/search-bar';
import FilterBar from '@/components/movie/filter-bar'; // Added FilterBar import
import { searchMovies, SearchMoviesParams } from '@/lib/yts';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/shared/loading-spinner';
import PaginationControls from '@/components/movie/pagination-controls';

interface HomePageProps {
  searchParams?: {
    query?: string;
    page?: string;
    quality?: string;
    genre?: string;
    minimum_rating?: string;
    sort_by?: string;
  };
}

const MOVIES_PER_PAGE = 24;
const FEATURED_MOVIES_COUNT = 6;

async function TopRatedMovies() {
  const movieData = await searchMovies({ 
    sort_by: 'rating', 
    limit: FEATURED_MOVIES_COUNT 
  });
  return <MovieList movies={movieData.movies || []} itemsPerPage={FEATURED_MOVIES_COUNT} marquee={true} />;
}

async function MovieResults({ 
  query, 
  page, 
  quality, 
  genre, 
  minimum_rating, 
  sort_by 
}: { 
  query?: string; 
  page?: string;
  quality?: string;
  genre?: string;
  minimum_rating?: string;
  sort_by?: string;
}) {
  const currentPage = page ? parseInt(page, 10) : 1;
  
  const searchOptions: SearchMoviesParams = {
    query_term: query,
    limit: MOVIES_PER_PAGE,
    page: currentPage,
  };

  if (quality && quality !== 'all') searchOptions.quality = quality;
  if (genre && genre !== 'all') searchOptions.genre = genre;
  if (minimum_rating) {
    const ratingNum = parseInt(minimum_rating, 10);
    if (!isNaN(ratingNum) && ratingNum >= 0 && ratingNum <=9) { // YTS API uses 0-9
      searchOptions.minimum_rating = ratingNum;
    }
  }
  
  // Determine sort_by:
  // 1. Use sort_by from filter if present.
  // 2. Else, if query term exists, use 'like_count'.
  // 3. Else (no query, no filter sort_by), use 'download_count' (default for popular).
  if (sort_by) {
    searchOptions.sort_by = sort_by;
  } else if (query) {
    searchOptions.sort_by = 'like_count';
  } else {
    searchOptions.sort_by = 'download_count';
  }
  
  const movieData = await searchMovies(searchOptions);
  
  const totalMovies = movieData.movie_count || 0;
  const totalPages = Math.ceil(totalMovies / MOVIES_PER_PAGE);
  const apiCurrentPage = movieData.page_number || currentPage; 
  const hasNextPage = apiCurrentPage < totalPages;
  const hasPrevPage = apiCurrentPage > 1;

  return (
    <>
      <MovieList movies={movieData.movies || []} itemsPerPage={MOVIES_PER_PAGE} />
      {totalPages > 0 && (
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
  const quality = searchParams?.quality;
  const genre = searchParams?.genre;
  const minimum_rating = searchParams?.minimum_rating;
  const sort_by = searchParams?.sort_by;

  const hasFiltersApplied = quality || genre || (minimum_rating && minimum_rating !== '0') || (sort_by && sort_by !== 'download_count');

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
      <FilterBar /> {/* Added FilterBar component */}
      
      <Separator className="my-8" />

      {!query && !hasFiltersApplied && ( // Show Top Rated only if no search query and no filters are active
        <>
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 font-headline">
              Top Rated Movies
            </h2>
            <Suspense fallback={
              <div className="flex overflow-hidden w-full py-4">
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
        </>
      )}

      <section>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 font-headline">
          {query ? `Search Results for "${query}"` : (hasFiltersApplied ? "Filtered Movies" : "Popular Movies")}
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
          <MovieResults 
            query={query} 
            page={page} 
            quality={quality}
            genre={genre}
            minimum_rating={minimum_rating}
            sort_by={sort_by}
          />
        </Suspense>
      </section>
    </Container>
  );
}

