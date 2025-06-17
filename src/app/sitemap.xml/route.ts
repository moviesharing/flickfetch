
import type { MetadataRoute } from 'next';
import { searchMovies } from '@/lib/yts';
import { generateMovieSlug } from '@/lib/utils';

export const runtime = 'edge';

const BASE_URL = 'https://flickfetch.pages.dev';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    '/',
    '/about',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '/' ? 'daily' : 'monthly' as 'daily' | 'monthly', // Type assertion for safety
    priority: route === '/' ? 1 : 0.8,
  }));

  let movieRoutes: MetadataRoute.Sitemap = [];
  try {
    // Fetch a sample of movies for the sitemap.
    // Let's fetch first 4 pages of up to 50 movies each = max 200 movies
    // sorted by date_added to get newer ones.
    const moviePagesToFetch = 4;
    const moviesPerPage = 50; // YTS API max limit
    let allMoviesForSitemap = [];

    for (let i = 1; i <= moviePagesToFetch; i++) {
        const movieData = await searchMovies({ sort_by: 'date_added', limit: moviesPerPage, page: i });
        if (movieData.movies && movieData.movies.length > 0) {
            allMoviesForSitemap.push(...movieData.movies);
        }
        // Break if fewer movies than limit were returned, indicating end of list
        if (!movieData.movies || movieData.movies.length < moviesPerPage) {
            break;
        }
    }
    
    // Deduplication is handled by searchMovies, but as a safeguard:
    const uniqueMovies = Array.from(new Map(allMoviesForSitemap.map(movie => [movie.id, movie])).values());

    movieRoutes = uniqueMovies.map((movie) => {
      const slug = generateMovieSlug(movie.title_english || movie.title, movie.year);
      return {
        url: `${BASE_URL}/movies/${slug}`,
        lastModified: movie.date_uploaded_unix ? new Date(movie.date_uploaded_unix * 1000).toISOString() : new Date().toISOString(),
        changeFrequency: 'weekly' as 'weekly', // Type assertion
        priority: 0.7,
      };
    });
  } catch (error) {
    console.error("Error fetching movies for sitemap:", error);
    // Proceed with static routes even if movie routes fail
  }

  return [...staticRoutes, ...movieRoutes];
}
