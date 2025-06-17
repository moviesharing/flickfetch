
'use client';

import type { Movie } from '@/types/yts';
import MovieCard from './movie-card';
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MovieListProps {
  movies: Movie[];
  loading?: boolean;
  itemsPerPage?: number;
  marquee?: boolean;
}

const DEFAULT_ITEMS_PER_PAGE = 24;
const MARQUEE_CARD_WIDTH_PX = 224; // md:w-56
const MARQUEE_CARD_GAP_PX = 16; // px-2 on each side of the item container
const MARQUEE_ITEM_EFFECTIVE_WIDTH = MARQUEE_CARD_WIDTH_PX + MARQUEE_CARD_GAP_PX;


export default function MovieList({ movies, loading = false, itemsPerPage = DEFAULT_ITEMS_PER_PAGE, marquee = false }: MovieListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'prev' | 'next') => {
    if (scrollContainerRef.current) {
      const scrollAmount = MARQUEE_ITEM_EFFECTIVE_WIDTH * 2; // Scroll by two card widths
      if (direction === 'next') {
        scrollContainerRef.current.scrollLeft += scrollAmount;
      } else {
        scrollContainerRef.current.scrollLeft -= scrollAmount;
      }
    }
  };

  if (loading) {
    if (marquee) {
       return (
         <div className="flex overflow-hidden w-full py-4">
           {Array.from({ length: itemsPerPage }).map((_, index) => (
             <div key={index} className="flex-shrink-0 px-2">
               <div style={{ width: `${MARQUEE_CARD_WIDTH_PX}px` }} className="h-[calc(var(--marquee-card-width)/2*3)] animate-pulse bg-card rounded-lg shadow-md" ></div>
             </div>
           ))}
         </div>
       );
    }
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

  if (marquee) {
    const duplicatedMovies = movies.length > 0 ? [...movies, ...movies, ...movies] : []; // Duplicate for seamless loop and ensure enough items for scrolling
    
    // Ensure we have some items before rendering marquee to avoid errors
    if (duplicatedMovies.length === 0) {
      return <p className="text-center text-muted-foreground text-lg my-8">No featured movies available.</p>;
    }

    return (
      <div className="relative w-full overflow-hidden group" tabIndex={0} aria-label="Featured movies carousel" style={{ '--marquee-card-width': `${MARQUEE_CARD_WIDTH_PX}px` } as React.CSSProperties}>
        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/70 hover:bg-background/90 focus:opacity-100 rounded-full shadow-md h-10 w-10 md:h-12 md:w-12"
          onClick={() => handleScroll('prev')}
          aria-label="Previous movies"
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/70 hover:bg-background/90 focus:opacity-100 rounded-full shadow-md h-10 w-10 md:h-12 md:w-12"
          onClick={() => handleScroll('next')}
          aria-label="Next movies"
        >
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
        </Button>

        <div
          ref={scrollContainerRef}
          className={cn(
            "flex animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] whitespace-nowrap py-4",
            "overflow-x-auto scroll-smooth scrollbar-none" // Enable JS scrolling and hide scrollbar
          )}
        >
          {duplicatedMovies.map((movie, index) => (
            <div key={`${movie.id}-marquee-${index}`} className="flex-shrink-0 px-2">
              <div className="w-48 md:w-56"> {/* Consistent width for cards in marquee */}
                  <MovieCard movie={movie} disableHoverScale={true} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {movies.map((movie, index) => (
        <MovieCard key={`${movie.id}-${index}`} movie={movie} />
      ))}
    </div>
  );
}

