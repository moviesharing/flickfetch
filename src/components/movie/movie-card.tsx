import Link from 'next/link';
import Image from 'next/image';
import type { Movie } from '@/types/yts';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movies/${movie.id}`} passHref legacyBehavior>
      <a className="block group animate-fade-in transform transition-all duration-300 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background rounded-lg overflow-hidden">
        <Card className="h-full flex flex-col bg-card hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="p-0 relative">
            <Image
              src={movie.medium_cover_image || `https://placehold.co/300x450.png?text=${encodeURIComponent(movie.title)}`}
              alt={movie.title}
              width={300}
              height={450}
              className="w-full h-auto object-cover aspect-[2/3]"
              data-ai-hint="movie poster"
              unoptimized={movie.medium_cover_image?.includes('yts')} 
            />
             <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400" />
                {movie.rating}/10
              </div>
          </CardHeader>
          <CardContent className="p-4 flex-grow">
            <CardTitle className="text-lg font-semibold leading-tight mb-1 group-hover:text-primary transition-colors duration-300">
              {movie.title_long}
            </CardTitle>
            <div className="flex flex-wrap gap-1 mt-2">
              {movie.genres?.slice(0, 3).map((genre) => (
                <Badge key={genre} variant="secondary" className="text-xs">{genre}</Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
             <p className="text-sm text-muted-foreground">{movie.year}</p>
          </CardFooter>
        </Card>
      </a>
    </Link>
  );
}
