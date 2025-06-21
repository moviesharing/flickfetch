
import Container from '@/components/layout/container';
import MovieList from '@/components/movie/movie-list';
import SearchBar from '@/components/movie/search-bar';
import FilterBar from '@/components/movie/filter-bar';
import { searchMovies, SearchMoviesParams } from '@/lib/yts';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/shared/loading-spinner';
import PaginationControls from '@/components/movie/pagination-controls';
import AdUnit from '@/components/ads/ad-unit'; // Import AdUnit
import VpnAffiliateAd from '@/components/ads/VpnAffiliateAd';

export const runtime = 'edge';

interface HomePageProps {
  searchParams?: {
    query?: string;
    page?: string;
    quality?: string;
    genre?: string;
    minimum_rating?: string;
    sort_by?: string;
    year_query?: string; // Added for specific year query
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
  sort_by,
  year_query,
}: { 
  query?: string; 
  page?: string;
  quality?: string;
  genre?: string;
  minimum_rating?: string;
  sort_by?: string;
  year_query?: string;
}) {
  const currentPage = page ? parseInt(page, 10) : 1;
  
  const searchOptions: SearchMoviesParams = {
    query_term: query, // This might be overridden by year_query in searchMovies
    limit: MOVIES_PER_PAGE,
    page: currentPage,
    year_query: year_query, 
  };

  if (quality && quality !== 'all') searchOptions.quality = quality;
  if (genre && genre !== 'all') searchOptions.genre = genre;
  if (minimum_rating) {
    const ratingNum = parseInt(minimum_rating, 10);
    if (!isNaN(ratingNum) && ratingNum >= 0 && ratingNum <=9) {
      searchOptions.minimum_rating = ratingNum;
    }
  }
  
  // Determine sort_by for the API call.
  // If year_query is present and sort_by is 'year', this is handled.
  // Otherwise, use sort_by from filter if present.
  // If no specific sort_by from filter, and a query term exists (not year_query related), use 'like_count'.
  // Default (no query, no filter sort_by) is 'download_count'.
  if (year_query && sort_by === 'year') {
    searchOptions.sort_by = 'year'; 
  } else if (sort_by) {
    searchOptions.sort_by = sort_by;
  } else if (query) { // query here means non-year specific query
    searchOptions.sort_by = 'like_count';
  } else {
    searchOptions.sort_by = 'download_count'; // Default for popular movies list
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
  let sort_by = searchParams?.sort_by; // Make it let to potentially adjust
  const year_query = searchParams?.year_query;

  // If year_query is active, ensure sort_by reflects 'year'
  if (year_query && (!sort_by || sort_by !== 'year')) {
    sort_by = 'year';
  }


  // Determine if any filters are actively applied
  const hasGeneralFilters = quality || genre || (minimum_rating && minimum_rating !== '0');
  const hasYearQueryFilter = !!year_query; // True if year_query has a value
  // A sort_by is considered an "active filter" if it's not the default 'download_count' OR if a year_query is active (which forces sort by year)
  const hasActiveSortFilter = (sort_by && sort_by !== 'download_count') || hasYearQueryFilter;
  
  const hasFiltersApplied = hasGeneralFilters || hasActiveSortFilter;


  // Determine results heading
  let resultsTitle = "Popular Movies"; // Default
  if (hasYearQueryFilter) {
    resultsTitle = `Movies from ${year_query}`;
  } else if (query) {
    resultsTitle = `Search Results for "${query}"`;
  } else if (hasFiltersApplied) { 
    resultsTitle = "Filtered Movies";
  }


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
      <FilterBar />
      <AdUnit /> {/* Ad unit below filter bar */}
      
      <Separator className="my-8" />

      {/* Show Top Rated only if no search query and no filters (including year_query) are active */}
      {!query && !hasFiltersApplied && (
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
          
          <VpnAffiliateAd />

          <Separator className="my-8" />
        </>
      )}

      <section>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 font-headline">
          {resultsTitle}
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
            sort_by={sort_by} // Use the potentially adjusted sort_by
            year_query={year_query}
          />
        </Suspense>
      </section>
    </Container>
  );
}
