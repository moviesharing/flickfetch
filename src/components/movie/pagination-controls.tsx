
'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
}: PaginationControlsProps) {
  const searchParams = useSearchParams();
  
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString()); // Ensure all existing params are preserved
    if (pageNumber > 1) {
      params.set('page', pageNumber.toString());
    } else {
      params.delete('page'); // Remove page param for page 1 for a cleaner URL
    }
    const queryString = params.toString();
    return `/${queryString ? `?${queryString}` : ''}`; // Handle case with no query params
  };

  return (
    <div className="flex items-center justify-center space-x-4 py-8">
      <Button asChild variant="outline" disabled={!hasPrevPage} size="sm">
        <Link href={createPageURL(currentPage - 1)} scroll={false}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Link>
      </Button>
      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>
      <Button asChild variant="outline" disabled={!hasNextPage} size="sm">
        <Link href={createPageURL(currentPage + 1)} scroll={false}>
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
