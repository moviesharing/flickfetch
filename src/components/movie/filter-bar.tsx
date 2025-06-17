
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const qualityOptions = [
  { value: 'all', label: 'All Qualities' },
  { value: '720p', label: '720p' },
  { value: '1080p', label: '1080p' },
  { value: '2160p', label: '2160p (4K)' },
  { value: '3D', label: '3D' },
];

const genreOptions = [
  { value: 'all', label: 'All Genres' },
  { value: 'action', label: 'Action' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'animation', label: 'Animation' },
  { value: 'biography', label: 'Biography' },
  { value: 'comedy', label: 'Comedy' },
  { value: 'crime', label: 'Crime' },
  { value: 'drama', label: 'Drama' },
  { value: 'family', label: 'Family' },
  { value: 'fantasy', label: 'Fantasy' },
  { value: 'film-noir', label: 'Film-Noir' },
  { value: 'history', label: 'History' },
  { value: 'horror', label: 'Horror' },
  { value: 'music', label: 'Music' },
  { value: 'musical', label: 'Musical' },
  { value: 'mystery', label: 'Mystery' },
  { value: 'romance', label: 'Romance' },
  { value: 'sci-fi', label: 'Sci-Fi' },
  { value: 'sport', label: 'Sport' },
  { value: 'thriller', label: 'Thriller' },
  { value: 'war', label: 'War' },
  { value: 'western', label: 'Western' },
];

const ratingOptions = [
  { value: '0', label: 'All Ratings' },
  { value: '9', label: '9+ Stars' },
  { value: '8', label: '8+ Stars' },
  { value: '7', label: '7+ Stars' },
  { value: '6', label: '6+ Stars' },
  { value: '5', label: '5+ Stars' },
  { value: '4', label: '4+ Stars' },
  { value: '3', label: '3+ Stars' },
  { value: '2', label: '2+ Stars' },
  { value: '1', label: '1+ Star' },
];

const sortByOptions = [
  { value: 'date_added', label: 'Latest' },
  { value: 'download_count', label: 'Popular' },
  { value: 'like_count', label: 'Most Liked' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'title', label: 'Alphabetical' },
  { value: 'year', label: 'Year'},
  { value: 'peers', label: 'Peers' },
  { value: 'seeds', label: 'Seeds' },
];

interface FilterDefinition {
  paramName: string;
  label: string;
  options: { value: string; label: string }[];
  defaultValue: string;
}

// General filters (excluding sort_by, which is handled specially)
const generalFilters: FilterDefinition[] = [
  { paramName: 'quality', label: 'Quality:', options: qualityOptions, defaultValue: 'all' },
  { paramName: 'genre', label: 'Genre:', options: genreOptions, defaultValue: 'all' },
  { paramName: 'minimum_rating', label: 'Rating:', options: ratingOptions, defaultValue: '0' },
];

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSortBy = searchParams.get('sort_by') || 'download_count';
  const currentYearQuery = searchParams.get('year_query') || '';
  const [yearInputValue, setYearInputValue] = useState(currentYearQuery);

  useEffect(() => {
    // Sync year input value if URL changes externally
    setYearInputValue(searchParams.get('year_query') || '');
  }, [searchParams]);

  const handleGeneralFilterChange = (paramName: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    
    // Default value conditions for removal
    const isDefaultQuality = paramName === 'quality' && value === 'all';
    const isDefaultGenre = paramName === 'genre' && value === 'all';
    const isDefaultRating = paramName === 'minimum_rating' && value === '0';

    if (isDefaultQuality || isDefaultGenre || isDefaultRating) {
      current.delete(paramName);
    } else {
      current.set(paramName, value);
    }
    
    current.delete('page');
    const search = current.toString();
    const queryPath = search ? `?${search}` : '';
    router.push(`/${queryPath}`);
  };

  const handleSortByChange = (value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    
    if (value === 'download_count' && !current.get('query') && !current.get('year_query')) {
      current.delete('sort_by');
    } else {
      current.set('sort_by', value);
    }

    if (value !== 'year') {
      current.delete('year_query');
      setYearInputValue(''); 
    }
    
    current.delete('page');
    const search = current.toString();
    const queryPath = search ? `?${search}` : '';
    router.push(`/${queryPath}`);
  };

  const handleYearInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYearInputValue(e.target.value);
  };

  const handleYearInputSubmit = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const yearVal = yearInputValue.trim();

    if (yearVal && /^\d{4}$/.test(yearVal)) {
      current.set('year_query', yearVal);
      current.set('sort_by', 'year'); // Ensure sort_by is year
      current.delete('query'); // Year query overrides general text query from main search bar
    } else {
      current.delete('year_query');
      // If year input is cleared but sort_by was 'year', it just sorts by year generally.
      // No need to change sort_by here as it's handled by its own dropdown.
      // If yearVal is empty and user explicitly set sort_by to 'year', it will sort all movies by year.
    }
    current.delete('page');
    const search = current.toString();
    const queryPath = search ? `?${search}` : '';
    router.push(`/${queryPath}`);
  };


  return (
    <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
      {generalFilters.map(filter => (
        <div key={filter.paramName} className="space-y-1.5">
          <Label htmlFor={filter.paramName} className="text-sm font-medium text-muted-foreground">{filter.label}</Label>
          <Select
            value={searchParams.get(filter.paramName) || filter.defaultValue}
            onValueChange={(value) => handleGeneralFilterChange(filter.paramName, value)}
          >
            <SelectTrigger id={filter.paramName} className="w-full rounded-lg shadow-sm">
              <SelectValue placeholder={`Select ${filter.label.replace(':','')}`} />
            </SelectTrigger>
            <SelectContent>
              {filter.options.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}

      {/* Sort By Filter */}
      <div className="space-y-1.5">
        <Label htmlFor="sort_by_select" className="text-sm font-medium text-muted-foreground">Order By:</Label>
        <Select
          value={currentSortBy}
          onValueChange={handleSortByChange}
        >
          <SelectTrigger id="sort_by_select" className="w-full rounded-lg shadow-sm">
            <SelectValue placeholder="Order By" />
          </SelectTrigger>
          <SelectContent>
            {sortByOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Conditional Year Input */}
      {currentSortBy === 'year' && (
        <div className="space-y-1.5"> {/* This will flow into the grid */}
          <Label htmlFor="year_query_input" className="text-sm font-medium text-muted-foreground">Specific Year:</Label>
          <Input
            id="year_query_input"
            type="text" 
            placeholder="YYYY"
            value={yearInputValue}
            onChange={handleYearInputChange}
            onBlur={handleYearInputSubmit}
            onKeyDown={(e) => { 
              if (e.key === 'Enter') { 
                e.preventDefault(); 
                handleYearInputSubmit(); 
              }
            }}
            maxLength={4}
            className="w-full rounded-lg shadow-sm"
          />
        </div>
      )}
    </div>
  );
}
