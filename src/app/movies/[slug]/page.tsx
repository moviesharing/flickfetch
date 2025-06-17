
import Link from 'next/link';
import Image from 'next/image';
import { getMovieDetails, getMovieSuggestions, searchMovies } from '@/lib/yts';
import Container from '@/components/layout/container';
import TorrentTable from '@/components/movie/torrent-table';
import MovieList from '@/components/movie/movie-list';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, Clock, CalendarDays, Users, Languages } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/shared/loading-spinner';
import { notFound } from 'next/navigation';
import { YtsMovie } from '@/types/yts';
import { generateMovieSlug } from '@/lib/utils';
import AdUnit from '@/components/ads/ad-unit'; // Import AdUnit

export const runtime = 'edge';

interface MovieDetailsPageProps {
  params: {
    slug: string; // e.g., "movie-title-2023"
  };
}

async function MovieSuggestions({ movieId }: { movieId: number }) {
  const suggestions = await getMovieSuggestions(movieId);
  if (!suggestions || suggestions.length === 0) {
    return <p className="text-muted-foreground">No suggestions available.</p>;
  }
  return <MovieList movies={suggestions} />;
}

export default async function MovieDetailsPage({ params }: MovieDetailsPageProps) {
  const slug = params.slug;

  const slugParts = slug.split('-');
  const potentialYearString = slugParts.pop(); 
  const potentialTitleSearch = slugParts.join(' '); 

  if (!potentialYearString || isNaN(parseInt(potentialYearString, 10))) {
    console.error('Could not parse year from slug:', slug);
    notFound();
  }
  const yearToMatch = parseInt(potentialYearString, 10);

  if (!potentialTitleSearch) {
    console.error('Could not parse title from slug:', slug);
    notFound();
  }

  const searchResults = await searchMovies({ query_term: potentialTitleSearch, limit: 10, sort_by: 'year' }); 

  let foundMovieId: number | null = null;

  if (searchResults.movies && searchResults.movies.length > 0) {
    for (const searchedMovie of searchResults.movies) {
      if (searchedMovie.year === yearToMatch) {
        const titleForSlugComparison = searchedMovie.title_english || searchedMovie.title;
        const searchedMovieSlug = generateMovieSlug(titleForSlugComparison, searchedMovie.year);
        
        if (searchedMovieSlug === slug) {
            foundMovieId = searchedMovie.id;
            break; 
        }
        if (!foundMovieId) {
          const searchSlugCore = slugParts.join('-');
          if (searchedMovieSlug.startsWith(searchSlugCore)) { 
             foundMovieId = searchedMovie.id;
          }
        }
      }
    }
  }

  if (!foundMovieId) {
    console.warn(`No definitive matching movie found for slug: ${slug} (parsed title: "${potentialTitleSearch}", year: ${yearToMatch})`);
    notFound();
  }

  const movie = await getMovieDetails({ movie_id: foundMovieId, with_cast: true });

  if (!movie) {
    console.warn(`Movie details fetch failed for ID: ${foundMovieId}, derived from slug: ${slug}`);
    notFound();
  }
  
  const currentMovieSlug = generateMovieSlug(movie.title_english || movie.title, movie.year);
  if (currentMovieSlug !== slug) {
    console.warn(`Fetched movie slug "${currentMovieSlug}" (from ID ${movie.id}) does not exactly match requested slug "${slug}". Proceeding, but this might indicate an imperfect match.`);
  }

  return (
    <Container className="py-6 md:py-10">
      <div className="mb-6">
        <Button asChild variant="outline" size="sm">
          <Link href="/" className="inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Search
          </Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-10">
        <div className="md:col-span-1">
          <Image
            src={movie.large_cover_image || `https://placehold.co/400x600.png?text=${encodeURIComponent(movie.title)}`}
            alt={movie.title}
            width={400}
            height={600}
            className="w-full h-auto object-cover rounded-lg shadow-xl aspect-[2/3]"
            data-ai-hint="movie poster detail"
            priority
            unoptimized={movie.large_cover_image?.includes('yts')} 
          />
        </div>

        <div className="md:col-span-2 space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold font-headline">{movie.title_long}</h1>
          
          <div className="flex flex-wrap gap-2 items-center">
            <Badge variant="outline" className="text-sm p-2 flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400" /> {movie.rating}/10
            </Badge>
            <Badge variant="outline" className="text-sm p-2 flex items-center gap-1">
              <Clock className="w-4 h-4 text-blue-400" /> {movie.runtime} min
            </Badge>
            <Badge variant="outline" className="text-sm p-2 flex items-center gap-1">
              <CalendarDays className="w-4 h-4 text-green-400" /> {movie.year}
            </Badge>
             <Badge variant="outline" className="text-sm p-2 flex items-center gap-1">
              <Languages className="w-4 h-4 text-purple-400" /> {movie.language}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-2">
            {movie.genres?.map((genre) => (
              <Badge key={genre} className="text-sm">{genre}</Badge>
            ))}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Synopsis</h2>
            <p className="text-muted-foreground leading-relaxed">{movie.description_full || movie.summary || 'No synopsis available.'}</p>
          </div>

          {movie.cast && movie.cast.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Cast</h2>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {movie.cast.slice(0, 8).map((actor) => (
                  <span key={actor.name} className="text-sm text-foreground_muted flex items-center gap-1">
                    <Users className="w-3 h-3 text-primary" /> {actor.name} <span className="text-xs text-muted-foreground">as {actor.character_name}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {movie.yt_trailer_code && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Trailer</h2>
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${movie.yt_trailer_code}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <AdUnit /> {/* Ad unit after movie details block */}

      <Separator className="my-8 md:my-12" />

      <section className="mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 font-headline">Available Torrents</h2>
        <TorrentTable torrents={movie.torrents} movieTitle={movie.title_long} />
      </section>

      <Separator className="my-8 md:my-12" />

      <section>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 font-headline">Suggested Movies</h2>
        <Suspense fallback={
           <div className="flex justify-center items-center min-h-[200px]">
            <LoadingSpinner size={36} />
          </div>
        }>
          <MovieSuggestions movieId={movie.id} />
        </Suspense>
      </section>
    </Container>
  );
}
