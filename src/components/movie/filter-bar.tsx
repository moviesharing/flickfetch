
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

const filters: FilterDefinition[] = [
  { paramName: 'quality', label: 'Quality:', options: qualityOptions, defaultValue: 'all' },
  { paramName: 'genre', label: 'Genre:', options: genreOptions, defaultValue: 'all' },
  { paramName: 'minimum_rating', label: 'Rating:', options: ratingOptions, defaultValue: '0' },
  { paramName: 'sort_by', label: 'Order By:', options: sortByOptions, defaultValue: 'download_count' },
];

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (paramName: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    
    if (value === 'all' || (paramName === 'minimum_rating' && value === '0') || (paramName === 'sort_by' && value === 'download_count' && !current.get('query_term'))) {
      current.delete(paramName);
    } else {
      current.set(paramName, value);
    }
    
    // Reset page to 1 when filters change
    current.delete('page');

    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`/${query}`);
  };

  return (
    <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
      {filters.map(filter => (
        <div key={filter.paramName} className="space-y-1.5">
          <Label htmlFor={filter.paramName} className="text-sm font-medium text-muted-foreground">{filter.label}</Label>
          <Select
            value={searchParams.get(filter.paramName) || filter.defaultValue}
            onValueChange={(value) => handleFilterChange(filter.paramName, value)}
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
    </div>
  );
}
