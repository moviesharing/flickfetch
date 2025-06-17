
import type { YTSListMoviesResponse, YTSMovieDetailsResponse, Movie } from '@/types/yts';

const YTS_API_BASE_URL = 'https://yts.mx/api/v2';

export interface SearchMoviesParams {
  query_term?: string;
  genre?: string;
  sort_by?: string;
  quality?: string;
  minimum_rating?: number;
  limit?: number;
  page?: number;
  year_query?: string; // New parameter for specific year query
}

// Helper function to de-duplicate movies by ID
function deduplicateMoviesById(movies: Movie[]): Movie[] {
  if (!movies || movies.length === 0) {
    return [];
  }
  const seenIds = new Set<number>();
  return movies.filter(movie => {
    if (seenIds.has(movie.id)) {
      return false;
    }
    seenIds.add(movie.id);
    return true;
  });
}

export async function searchMovies(params: SearchMoviesParams = {}): Promise<YTSListMoviesResponse['data']> {
  const queryParams = new URLSearchParams();
  let effectiveQueryTerm = params.query_term;

  // If sorting by year and a specific year_query is provided, use it as the main query_term
  if (params.sort_by === 'year' && params.year_query) {
    const yearNum = parseInt(params.year_query, 10);
    // Basic validation for a 4-digit year
    if (!isNaN(yearNum) && params.year_query.length === 4) {
      effectiveQueryTerm = params.year_query; // Year query takes precedence
    }
  }
  
  if (effectiveQueryTerm) queryParams.append('query_term', effectiveQueryTerm);
  
  if (params.genre && params.genre !== 'all') queryParams.append('genre', params.genre);
  
  if (params.sort_by) queryParams.append('sort_by', params.sort_by);

  if (params.quality && params.quality !== 'all') queryParams.append('quality', params.quality);
  
  if (params.minimum_rating && params.minimum_rating > 0) {
    queryParams.append('minimum_rating', params.minimum_rating.toString());
  }
  
  queryParams.append('limit', (params.limit || 20).toString());
  queryParams.append('page', (params.page || 1).toString());

  try {
    const response = await fetch(`${YTS_API_BASE_URL}/list_movies.json?${queryParams.toString()}`);
    if (!response.ok) {
      throw new Error(`YTS API request failed: ${response.statusText}`);
    }
    const data: YTSListMoviesResponse = await response.json();
    if (data.status !== 'ok') {
      throw new Error(`YTS API error: ${data.status_message}`);
    }
    if (data.data && data.data.movies) {
      data.data.movies = deduplicateMoviesById(data.data.movies);
    }
    return data.data;
  } catch (error) {
    console.error('Error fetching movies from YTS:', error);
    return { movies: [], movie_count: 0, limit: params.limit || 20, page_number: params.page || 1 };
  }
}

interface GetMovieDetailsParams {
  movie_id: number;
  with_images?: boolean;
  with_cast?: boolean;
}

export async function getMovieDetails(params: GetMovieDetailsParams): Promise<Movie | null> {
  const queryParams = new URLSearchParams();
  queryParams.append('movie_id', params.movie_id.toString());
  if (params.with_images) queryParams.append('with_images', 'true');
  if (params.with_cast) queryParams.append('with_cast', 'true');
  
  try {
    const response = await fetch(`${YTS_API_BASE_URL}/movie_details.json?${queryParams.toString()}`);
    if (!response.ok) {
      throw new Error(`YTS API request failed: ${response.statusText}`);
    }
    const data: YTSMovieDetailsResponse = await response.json();
     if (data.status !== 'ok' || !data.data.movie) {
      throw new Error(`YTS API error: ${data.status_message} or movie not found.`);
    }
    return data.data.movie;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${params.movie_id}:`, error);
    return null;
  }
}

export async function getMovieSuggestions(movie_id: number): Promise<Movie[]> {
   const queryParams = new URLSearchParams();
  queryParams.append('movie_id', movie_id.toString());
  try {
    const response = await fetch(`${YTS_API_BASE_URL}/movie_suggestions.json?${queryParams.toString()}`);
    if (!response.ok) {
      throw new Error(`YTS API request failed: ${response.statusText}`);
    }
    const data: YTSListMoviesResponse = await response.json(); 
    if (data.status !== 'ok') {
      throw new Error(`YTS API error: ${data.status_message}`);
    }
    let suggestedMovies = data.data.movies || [];
    if (suggestedMovies.length > 0) {
      suggestedMovies = deduplicateMoviesById(suggestedMovies);
    }
    return suggestedMovies;
  } catch (error) {
     console.error(`Error fetching movie suggestions for ID ${movie_id}:`, error);
    return [];
  }
}

export const DEFAULT_TRACKERS = [
  'udp://tracker.opentrackr.org:1337/announce',
  'udp://tracker.openbittorrent.com:6969/announce',
  'udp://open.tracker.cl:1337/announce',
  'udp://tracker.dler.org:6969/announce',
  'udp://opentracker.i2p.rocks:6969/announce',
  'udp://tracker.internetwarriors.net:1337/announce'
];

export function generateMagnetLink(hash: string, title: string, trackers: string[] = DEFAULT_TRACKERS): string {
  const dn = encodeURIComponent(title);
  const trs = trackers.map(tracker => `&tr=${encodeURIComponent(tracker)}`).join('');
  return `magnet:?xt=urn:btih:${hash}&dn=${dn}${trs}`;
}
